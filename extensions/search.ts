// // src/lib/search.ts
// import { Prisma } from '@prisma/client';
// import { logError, logInfo } from '../logger';

// type SortOrderMap = Record<string, Prisma.SortOrder>;

// // Types for Prisma queries
// export type SearchTerm = string | number | { [operator: string]: any };
// export type SearchClause = { [column: string]: SearchTerm | SearchClause };

// // Function to create a search clause for Prisma queries
// function createSearchClause(searchTerms: SearchClause): Prisma.JsonObject {
//   return {
//     OR: Object.entries(searchTerms).map(([column, searchTerm]) => {
//       if (typeof searchTerm === 'object' && searchTerm !== null) {
//         return { [column]: searchTerm };
//       }
//       return { [column]: { contains: searchTerm } };
//     }),
//   };
// }

// // Function to perform a search on a specified model and columns
// export async function search<T extends PrismaModelNames>(
//   modelName: T,
//   searchTerms: SearchClause,
//   skip?: number,
//   take?: number,
//   sort?: SortOrderMap
// ): Promise<any[]> {
//   const args = {
//     where: createSearchClause(searchTerms),
//     skip,
//     take,
//     orderBy: sort,
//   };

//   try {
//     const result = await handlePrismaOperation(
//       () => prismaModels[modelName].findMany(args),
//       modelName,
//       'findMany',
//       args
//     );
//     logInfo(`Successfully performed search operation for model ${modelName}`);
//     return result;
//   } catch (error) {
//     logError(`Error performing search operation for model ${modelName}: ${error}`);
//     throw error;
//   }
// }
