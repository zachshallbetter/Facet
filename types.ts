// src/lib/facet/types.ts
import { Prisma } from '@prisma/client';

export type SortOrderInput = Record<string, 'asc' | 'desc'>;

export type Query = { [key: string]: any };
  
export type Result = { [key: string]: any };

export interface FindManyOptions {
  where?: Prisma.JsonObject;
  skip?: number;
  take?: number;
  cursor?: Prisma.JsonValue | null;
  orderBy?: Prisma.JsonValue | null;
  select?: Prisma.JsonValue | null;
  include?: Prisma.JsonValue | null;
}

export interface SearchOptions {
  [field: string]: string;
}

export interface WhereInput {
  [key: string]: any;
}

export interface OrderByInput {
  [key: string]: any;
}

export interface FilterOperation {
  type: 'filter';
  filters: WhereInput;
}

export interface RefineOperation {
  type: 'refine';
  refinements: WhereInput[];
}

export type SortOperation = {
  type: 'sort';
  field: string;
  order: 'asc' | 'desc';
};

export interface EqOperation {
  type: 'eq';
  field: string;
  value: string | number | boolean;
}


export type Operation = FilterOperation | RefineOperation | SortOperation | EqOperation;
