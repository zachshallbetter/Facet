// facet/operations.ts
'use client'
import { useState, useEffect } from 'react';
import * as facetTypes from './types';
import Facet from './facet';
import { PrismaClient } from '@prisma/client';

type FacetDataUtility<T> = {
  filterData: (filters: facetTypes.WhereInput) => Promise<void>;
  refineData: (refinements: facetTypes.WhereInput[]) => Promise<void>;
  sortData: (field: string, order: 'asc' | 'desc') => Promise<void>;
  applyDataOperations: (operations: facetTypes.Operation[]) => Promise<void>;
  data: T[];
};

type FacetDataProps<T, PrismaModelName extends keyof PrismaClient> = {
  initialData: T[];
  prismaModelName: PrismaModelName;
  prismaOptions: facetTypes.FindManyOptions;
};

const useFacetData = <T extends { id: string }, PrismaModelName extends keyof PrismaClient>({
  initialData,
  prismaModelName,
  prismaOptions,
}: FacetDataProps<T, PrismaModelName>): FacetDataUtility<T> => {

  const [data, setData] = useState<T[]>(initialData);

  useEffect(() => {
    const handleDataChange = (modelName: keyof PrismaClient, newData: any) => {
      if (modelName === prismaModelName) {
        setData(newData);
      }
    };

    Facet.emitter.on('dataChanged', handleDataChange);

    return () => {
      Facet.emitter.off('dataChanged', handleDataChange);
    };
  }, [prismaModelName]);


  const filterData = async (filters: facetTypes.WhereInput): Promise<void> => {
    const facet = new Facet(prismaModelName);
    const filteredData = await facet.many({
      ...prismaOptions,
      where: filters,
    });
    if (filteredData !== undefined) {
      setData(filteredData);
    }
  };

  const refineData = async (refinements: facetTypes.WhereInput[]): Promise<void> => {
    const facet = new Facet(prismaModelName);
    const where = { AND: refinements };
    const refinedData = await facet.many({
      ...prismaOptions,
      where,
    });
    if (refinedData !== undefined) {
      setData(refinedData);
    }
  };

  const sortData = async (field: string, order: 'asc' | 'desc'): Promise<void> => {
    const facet = new Facet(prismaModelName);
    const sortedData = await facet.many({
      ...prismaOptions,
      orderBy: {
        [field]: order,
      },
    });

    if (sortedData !== undefined) {
      setData(sortedData);
    }
  };

  const applyDataOperations = async (operations: facetTypes.Operation[]): Promise<void> => {
    let currentData = initialData;

    for (const operation of operations) {
      const facet = new Facet(prismaModelName);
      switch (operation.type) {
        case 'filter':
          currentData = await facet.many({
            ...prismaOptions,
            where: operation.filters,
          });
          break;
        case 'refine':
          const where = { AND: operation.refinements };
          currentData = await facet.many({
            ...prismaOptions,
            where,
          });
          break;
        case 'sort':
          currentData = await facet.many({
            ...prismaOptions,
            orderBy: { [operation.field]: operation.order },
          });
          break;
        default:
          break;
      }
    }

    setData(currentData);
  };


  return {
    filterData,
    refineData,
    sortData,
    applyDataOperations,
    data,
  };
};

export default useFacetData;
