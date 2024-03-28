// src/lib/facet/facet.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { EventEmitter } from 'events';
import { handlePrismaError } from './errors';
import { measureQuery, measureQueryAndEmit } from './measure';
import { logError, logInfo } from '@/lib/logger';
import * as FacetTypes from './types';

function prepareOptions(options: FacetTypes.FindManyOptions & { search?: FacetTypes.SearchOptions }) {
  if (options.search) {
    for (const [field, query] of Object.entries(options.search)) {
      options.where = {
        ...options.where,
        [field]: {
          contains: query,
        },
      };
    }
  }
  return options;
}

export class Facet<T extends keyof PrismaClient> {
  private static prismaClient: PrismaClient | null = null;
  private static operationCount = 0;
  public static emitter = new EventEmitter();
  private model: string;

  constructor(model: T) {
    if (this.modelExistsInPrismaClient(model)) {
      this.model = String(model) as string;
    } else {
      throw new Error(`Invalid model name: ${String(model)}`);
    }
  }


  private modelExistsInPrismaClient(model: T): boolean {
    return model in Facet.prismaClient!;
  }

  private static connect() {
    Facet.operationCount += 1;
  }

  private static disconnect() {
    Facet.operationCount -= 1;
    if (Facet.operationCount === 0 && Facet.prismaClient) {
      Facet.prismaClient.$disconnect();
      Facet.prismaClient = null;
    }
  }

  private static async ensureInitialized() {
    if (!Facet.prismaClient) {
      await Facet.connect();
    }
  }

  public async many(
    options: FacetTypes.FindManyOptions & { search?: FacetTypes.SearchOptions }
  ): Promise<any[]> {
    await Facet.ensureInitialized();
    options = prepareOptions(options);
    try {
      return await measureQuery(
        Facet.prismaClient!,
        (Facet.prismaClient! as any)[String(this.model)].findMany(options),
        this.model
      );
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError) {
        handlePrismaError(error, this.model);
      } else {
        logError(`An unknown error occurred when calling Facet.many with options ${JSON.stringify(options)}.`, this.model);
      }
      return [];
    }
  }

  public async loadMore(options: FacetTypes.FindManyOptions & { search?: FacetTypes.SearchOptions }): Promise<any[]> {
    await Facet.ensureInitialized();
    options = prepareOptions(options);
    try {
      return measureQuery(
        Facet.prismaClient!,
        (Facet.prismaClient! as any)[String(this.model)].findMany(options),
        this.model
      );
    } catch (error: any) {
      if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof Prisma.PrismaClientUnknownRequestError) {
        handlePrismaError(error, this.model);
      } else {
        logError(`An unknown error occurred when calling Facet.loadMore with options ${JSON.stringify(options)}.`, this.model);
      }
      return [];
    }
  }

  public async one(args: any): Promise<any | null> {
    await Facet.ensureInitialized();
    return measureQuery(
      Facet.prismaClient!,
      (Facet.prismaClient! as any)[String(this.model)].findUnique({ where: args }),
      this.model
    );
  }

  public async create(data: any): Promise<any> {
    await Facet.ensureInitialized();
    const result = await measureQuery(
      Facet.prismaClient!,
      (Facet.prismaClient! as any)[String(this.model)].create({ data }),
      this.model
    );
    Facet.emitter.emit('dataChanged', this.model, result);
    return result;
  }

  public async update(args: any, data: any): Promise<any> {
    await Facet.ensureInitialized();
    const result = await measureQuery(
      Facet.prismaClient!,
      (Facet.prismaClient! as any)[String(this.model)].update({ where: args, data }),
      this.model
    );
    Facet.emitter.emit('dataChanged', this.model, result);
    return result;
  }

  public async delete(args: any): Promise<any> {
    await Facet.ensureInitialized();
    const result = await measureQuery(
      Facet.prismaClient!,
      (Facet.prismaClient! as any)[String(this.model)].delete({ where: args }),
      this.model
    );
    Facet.emitter.emit('dataChanged', this.model, result);
    return result;
  }
}

export default Facet;
