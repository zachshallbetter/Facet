// facet/measure.ts
import { performance } from 'perf_hooks';
import { logInfo } from '@/lib/logger';
import { Facet } from './facet';

export async function measureQuery<T>(
  prismaClient: any,
  query: Promise<T>,
  modelName: string,
  retryCount = 0
): Promise<T> {
  const start = performance.now();
  try {
    const result = await query;
    const end = performance.now();
    const duration = end - start;
    logInfo(`Query on model ${modelName} took ${duration} ms`);
    return result;
  } catch (error: any) {
    if (retryCount < 3) {
      return measureQuery(prismaClient, query, modelName, retryCount + 1);
    }
    throw error;
  }
}

export async function measureQueryAndEmit<T>(
  prismaClient: any,
  query: Promise<T>,
  modelName: string,
  retryCount = 0
): Promise<T> {
  const start = performance.now();
  try {
    const result = await query;
    const end = performance.now();
    const duration = end - start;
    Facet.emitter.emit('query', modelName, duration);
    logInfo(`Query on model ${modelName} took ${duration} ms`);
    return result;
  } catch (error: any) {
    if (retryCount < 3) {
      return measureQueryAndEmit(prismaClient, query, modelName, retryCount + 1);
    }
    throw error;
  }
}
