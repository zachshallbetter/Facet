import { WhereInput, OrderByInput } from './types';

export const constructWhereClause = (where: WhereInput): string => {
  const clauses = Object.entries(where).map(([field, value]) => {
    if (typeof value === 'object') {
      if (value._and) {
        const andConditions = value._and.map((condition: WhereInput) => `(${constructWhereClause(condition)})`);
        return andConditions.join(' AND ');
      }
      if (value._or) {
        const orConditions = value._or.map((condition: WhereInput) => `(${constructWhereClause(condition)})`);
        return orConditions.join(' OR ');
      }
      if (value._not) {
        const notCondition = `NOT (${constructWhereClause(value._not)})`;
        return notCondition;
      }
      const subClauses = Object.entries(value).map(([operator, operand]) => `${field}_${operator}:"${operand}"`);
      return subClauses.join(' AND ');
    }
    return `${field}:"${value}"`;
  });
  return clauses.join(' AND ');
};

export const constructOrderByClause = (orderBy: OrderByInput): string => {
    const clauses = Object.entries(orderBy).map(([field, order]) => `${field}_${order}`);
    // 
    return clauses.join(', ');
};

// 
export const constructSelectClause = (select: string[]): string => {
  // Join the array of selected fields with a comma separator
  return select.join(', ');
};

export const constructIncludeClause = (include: string[]): string => {
  // Join the array of included associations with a dot separator
  return include.join('.');
};

export const constructSkipClause = (skip: number): string => {
  // Convert the skip value to a string
  return `${skip}`;
};

export const constructTakeClause = (take: number): string => {
  // Convert the take value to a string
  return `${take}`;
};

export const constructCursorClause = (cursor: any): string => {
  // Convert the cursor value to a JSON string
  return JSON.stringify(cursor);
};

export const constructJsonCondition = (field: string, condition: any): string => {
  // Construct a JSON condition for advanced filtering
  return `${field}:${JSON.stringify(condition)}`;
};

export const constructGroupByClause = (groupBy: string[]): string => {
  // Join the array of fields to group by with a comma separator
  return groupBy.join(', ');
};

export const constructHavingClause = (having: WhereInput): string => {
  const clauses = Object.entries(having).map(([field, value]) => {
    if (typeof value === 'object') {
      if (value._and) {
        const andConditions = value._and.map((condition: WhereInput) => `(${constructHavingClause(condition)})`);
        return andConditions.join(' AND ');
      }
      if (value._or) {
        const orConditions = value._or.map((condition: WhereInput) => `(${constructHavingClause(condition)})`);
        return orConditions.join(' OR ');
      }
      if (value._not) {
        const notCondition = `NOT (${constructHavingClause(value._not)})`;
        return notCondition;
      }
      const subClauses = Object.entries(value).map(([operator, operand]) => `${field}_${operator}:"${operand}"`);
      return subClauses.join(' AND ');
    }
    return `${field}:"${value}"`;
  });
  return clauses.join(' AND ');
};

export const constructDistinctClause = (fields: string[]): string => {
  // Join the array of fields with a comma separator to create the DISTINCT clause
  return fields.join(', ');
};

export const constructCountClause = (field: string): string => {
  // Create the COUNT clause by prefixing the field with "count:"
  return `count:${field}`;
};

export const constructSumClause = (field: string): string => {
  // Create the SUM clause by prefixing the field with "sum:"
  return `sum:${field}`;
};

export const constructAvgClause = (field: string): string => {
  // Create the AVG clause by prefixing the field with "avg:"
  return `avg:${field}`;
};

export const constructMaxClause = (field: string): string => {
  // Create the MAX clause by prefixing the field with "max:"
  return `max:${field}`;
};

export const constructMinClause = (field: string): string => {
  // Create the MIN clause by prefixing the field with "min:"
  return `min:${field}`;
};

export const constructUnionClause = (queries: string[]): string => {
  // Join the array of queries with a space separator to create the UNION clause
  return queries.join(' UNION ');
};

export const constructFullTextSearchClause = (query: string): string => {
  // Create the full-text search clause by prefixing the query with "fullTextSearch:"
  return `fullTextSearch:${query}`;
};

export const constructFullTextSearchRankClause = (query: string, weights: Record<string, number>): string => {
  // Create the full-text search rank clause by combining the query and weights
  // The weights are provided as a record where the keys are the field names and the values are the weights
  const weightsString = Object.entries(weights).map(([field, weight]) => `${field}:${weight}`).join(',');
  return `fullTextSearchRank:${query},${weightsString}`;
};

export const constructFullTextSearchHighlightClause = (query: string): string => {
  // Create the full-text search highlight clause by prefixing the query with "fullTextSearchHighlight:"
  return `fullTextSearchHighlight:${query}`;
};

export const constructFullTextSearchSnippetClause = (query: string): string => {
  // Create the full-text search snippet clause by prefixing the query with "fullTextSearchSnippet:"
  return `fullTextSearchSnippet:${query}`;
};

export const constructDistinctOnClause = (fields: string[]): string => {
  // Create the DISTINCT ON clause by enclosing the fields in parentheses and joining them with a comma separator
  return `DISTINCT ON (${fields.join(',')})`;
};

export const constructPaginationClause = (page: number, perPage: number): string => {
  // Calculate the offset based on the page number and perPage value
  const offset = (page - 1) * perPage;
  // Create the pagination clause with the offset and limit
  return `OFFSET ${offset} LIMIT ${perPage}`;
};

export const constructOffsetFetchClause = (offset: number, fetch: number): string => {
  // Create the offset-fetch clause with the specified offset and fetch values
  return `OFFSET ${offset} ROWS FETCH NEXT ${fetch} ROWS ONLY`;
};

export const constructLockingClause = (lockMode: string): string => {
  // Create the locking clause with the specified lock mode
  return `FOR ${lockMode}`;
};
export const constructOnConflictClause = (fields: string[], updateFields: string[]): string => {
  // Join the conflict fields with a comma separator
  const conflictFields = fields.join(',');
  // Create the update fields string with parentheses if updateFields array is not empty
  const updateFieldsString = updateFields.length > 0 ? `(${updateFields.join(',')})` : '';
  // Create the ON CONFLICT clause with the conflict fields and update fields
  return `ON CONFLICT (${conflictFields}) DO UPDATE SET ${updateFieldsString}`;
};

export const constructReturningClause = (fields: string[]): string => {
  // Create the RETURNING clause by joining the fields with a comma separator
  return `RETURNING ${fields.join(',')}`;
};

export const constructNestedIncludeClause = (include: Record<string, string[]>): string => {
  // Create the nested include clause by iterating over the include object and joining the relation and fields with the appropriate syntax
  const nestedInclude = Object.entries(include)
    .map(([relation, fields]) => `${relation}{${fields.join(',')}}`)
    .join(',');
  return nestedInclude;
};

export const constructNestedSelectClause = (select: Record<string, string[]>): string => {
  // Create the nested select clause by iterating over the select object and joining the relation and fields with the appropriate syntax
  const nestedSelect = Object.entries(select)
    .map(([relation, fields]) => `${relation}{${fields.join(',')}}`)
    .join(',');
  return nestedSelect;
};

export const constructNestedOrderByClause = (orderBy: Record<string, OrderByInput>): string => {
  // Create the nested order by clause by iterating over the orderBy object and joining the relation and order with the appropriate syntax
  const nestedOrderBy = Object.entries(orderBy)
    .map(([relation, order]) => `${relation}_${order}`)
    .join(',');
  return nestedOrderBy;
};

export const constructJsonAggregateClause = (field: string): string => {
  // Create the JSON aggregate clause by prefixing the field with "jsonAgg:"
  return `jsonAgg:${field}`;
};

export const constructJsonAggregateOnClause = (field: string, subfield: string): string => {
  // Create the JSON aggregate on clause by combining the field and subfield with the appropriate syntax
  return `jsonAggOn:${field},${subfield}`;
};

export const constructJsonAggregateByClause = (field: string, aggregate: string): string => {
  // Create the JSON aggregate by clause by combining the field and aggregate with the appropriate syntax
  return `jsonAggBy:${field},${aggregate}`;
};

export const constructJsonAggregateOrderClause = (field: string, order: string): string => {
  // Create the JSON aggregate order clause by combining the field and order with the appropriate syntax
  return `jsonAggOrder:${field},${order}`;
};

export const constructJsonAggregateFieldClause = (field: string, subfield: string): string => {
  // Create the JSON aggregate field clause by combining the field and subfield with the appropriate syntax
  return `jsonAggField:${field},${subfield}`;
};

export const constructJsonAggregateFieldOrderClause = (field: string, subfield: string, order: string): string => {
  // Create the JSON aggregate field order clause by combining the field, subfield, and order with the appropriate syntax
  return `jsonAggFieldOrder:${field},${subfield},${order}`;
};

export const constructJsonAggregateFieldDistinctClause = (field: string, subfield: string): string => {
  // Create the JSON aggregate field distinct clause by combining the field and subfield with the appropriate syntax
  return `jsonAggFieldDistinct:${field},${subfield}`;
};

export const constructJsonAggregateFieldFilterClause = (field: string, subfield: string, filter: WhereInput): string => {
  // Construct the filter clause using the constructWhereClause utility function
  const filterClause = constructWhereClause(filter);
  // Create the JSON aggregate field filter clause by combining the field, subfield, and filter clause with the appropriate syntax
  return `jsonAggFieldFilter:${field},${subfield},${filterClause}`;
};

export const constructJsonAggregateFieldSortClause = (field: string, subfield: string, sort: OrderByInput): string => {
  // Construct the sort clause using the constructOrderByClause utility function
  const sortClause = constructOrderByClause(sort);
  // Create the JSON aggregate field sort clause by combining the field, subfield, and sort clause with the appropriate syntax
  return `jsonAggFieldSort:${field},${subfield},${sortClause}`;
};

export const constructJsonAggregateFieldSliceClause = (
  field: string,
  subfield: string,
  start: number,
  end: number
): string => {
  // Construct a JSON aggregate field slice clause with the provided parameters
  return `jsonAggFieldSlice:${field},${subfield},${start},${end}`;
};

export const constructJsonAggregateFieldSliceFromClause = (field: string, subfield: string, start: number): string => {
  // Construct a JSON aggregate field slice from clause with the provided parameters
  return `jsonAggFieldSliceFrom:${field},${subfield},${start}`;
};

export const constructJsonAggregateFieldSliceToClause = (field: string, subfield: string, end: number): string => {
  // Construct a JSON aggregate field slice to clause with the provided parameters
  return `jsonAggFieldSliceTo:${field},${subfield},${end}`;
};

export const constructJsonAggregateFieldSliceFullClause = (field: string, subfield: string): string => {
  // Construct a JSON aggregate field slice full clause with the provided parameters
  return `jsonAggFieldSliceFull:${field},${subfield}`;
};

export const constructJsonAggregateFieldSliceFromFullClause = (field: string, subfield: string, start: number): string => {
  // Construct a JSON aggregate field slice from full clause with the provided parameters
  return `jsonAggFieldSliceFromFull:${field},${subfield},${start}`;
};

export const constructJsonAggregateFieldSliceToFullClause = (field: string, subfield: string, end: number): string => {
  // Construct a JSON aggregate field slice to full clause with the provided parameters
  return `jsonAggFieldSliceToFull:${field},${subfield},${end}`;
};

export const constructJsonAggregateFieldSliceRangeClause = (
  field: string,
  subfield: string,
  start: number,
  end: number
): string => {
  // Construct a JSON aggregate field slice range clause with the provided parameters
  return `jsonAggFieldSliceRange:${field},${subfield},${start},${end}`;
};

export const constructJsonAggregateFieldSliceRangeFullClause = (
  field: string,
  subfield: string,
  start: number,
  end: number
): string => {
  // Construct a JSON aggregate field slice range full clause with the provided parameters
  return `jsonAggFieldSliceRangeFull:${field},${subfield},${start},${end}`;
};

export const constructJsonAggregateFieldSliceStepClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a JSON aggregate field slice step clause with the provided parameters
  return `jsonAggFieldSliceStep:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateFieldSliceStepFullClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a JSON aggregate field slice step full clause with the provided parameters
  return `jsonAggFieldSliceStepFull:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateFieldSliceRangeStepClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a JSON aggregate field slice range step clause with the provided parameters
  return `jsonAggFieldSliceRangeStep:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateFieldSliceRangeStepFullClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a JSON aggregate field slice range step full clause with the provided parameters
  return `jsonAggFieldSliceRangeStepFull:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateFieldSliceReverseClause = (
  field: string,
  subfield: string,
  start: number,
  end: number
): string => {
  // Construct a JSON aggregate field slice reverse clause with the provided parameters
  return `jsonAggFieldSliceReverse:${field},${subfield},${start},${end}`;
};

export const constructJsonAggregateFieldSliceReverseFullClause = (
  field: string,
  subfield: string,
  start: number,
  end: number
): string => {
  // Construct a JSON aggregate field slice reverse full clause with the provided parameters
  return `jsonAggFieldSliceReverseFull:${field},${subfield},${start},${end}`;
};

export const constructJsonAggregateFieldSliceRangeReverseClause = (
  field: string,
  subfield: string,
  start: number,
  end: number
): string => {
  // Construct a JSON aggregate field slice range reverse clause with the provided parameters
  return `jsonAggFieldSliceRangeReverse:${field},${subfield},${start},${end}`;
};

export const constructJsonAggregateFieldSliceRangeReverseFullClause = (
  field: string,
  subfield: string,
  start: number,
  end: number
): string => {
  // Construct a JSON aggregate field slice range reverse full clause with the provided parameters
  return `jsonAggFieldSliceRangeReverseFull:${field},${subfield},${start},${end}`;
};

export const constructJsonAggregateFieldSliceStepReverseClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with slicing in reverse order
  return `jsonAggFieldSliceStepReverse:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateFieldSliceStepReverseFullClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with slicing in reverse order and returning all elements
  return `jsonAggFieldSliceStepReverseFull:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateFieldSliceRangeStepReverseClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with slicing in reverse order within a range
  return `jsonAggFieldSliceRangeStepReverse:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateFieldSliceRangeStepReverseFullClause = (
  field: string,
  subfield: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with slicing in reverse order within a range and returning all elements
  return `jsonAggFieldSliceRangeStepReverseFull:${field},${subfield},${start},${end},${step}`;
};

export const constructJsonAggregateCountDistinctClause = (field: string): string => {
  // Construct a clause for aggregating a field with distinct count
  return `jsonAggCountDistinct:${field}`;
};

export const constructJsonAggregateCountDistinctOnClause = (field: string, distinctFields: string[]): string => {
  const distinctFieldsString = distinctFields.join(',');
  // Construct a clause for aggregating a field with distinct count on specified fields
  return `jsonAggCountDistinctOn:${field},${distinctFieldsString}`;
};

export const constructJsonAggregateCountDistinctOnHavingClause = (
  field: string,
  distinctFields: string[],
  having: WhereInput
): string => {
  const distinctFieldsString = distinctFields.join(',');
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with distinct count on specified fields and having a condition
  return `jsonAggCountDistinctOnHaving:${field},${distinctFieldsString},${havingClause}`;
};

export const constructJsonAggregateArrayDistinctClause = (field: string): string => {
  // Construct a clause for aggregating a field as an array with distinct elements
  return `jsonAggArrayDistinct:${field}`;
};

export const constructJsonAggregateArrayDistinctOnClause = (field: string, distinctFields: string[]): string => {
  const distinctFieldsString = distinctFields.join(',');
  // Construct a clause for aggregating a field as an array with distinct elements on specified fields
  return `jsonAggArrayDistinctOn:${field},${distinctFieldsString}`;
};

export const constructJsonAggregateArrayDistinctOnHavingClause = (
  field: string,
  distinctFields: string[],
  having: WhereInput
): string => {
  const distinctFieldsString = distinctFields.join(',');
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field as an array with distinct elements on specified fields and having a condition
  return `jsonAggArrayDistinctOnHaving:${field},${distinctFieldsString},${havingClause}`;
};

export const constructJsonAggregateObjectClause = (field: string): string => {
  // Construct a clause for aggregating a field as an object
  return `jsonAggObject:${field}`;
};

export const constructJsonAggregateObjectOnClause = (field: string, onField: string): string => {
  // Construct a clause for aggregating a field as an object on a specified field
  return `jsonAggObjectOn:${field},${onField}`;
};

export const constructJsonAggregateObjectOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field as an object on a specified field and having a condition
  return `jsonAggObjectOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateJsonClause = (field: string): string => {
  // Construct a clause for aggregating a field as a JSON value
  return `jsonAggJson:${field}`;
};

export const constructJsonAggregateJsonOnClause = (field: string, onField: string): string => {
  // Construct a JSON aggregate clause with the JSON_ON aggregation function
  return `jsonAggJsonOn:${field},${onField}`;
};

export const constructJsonAggregateJsonOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  // Construct a JSON aggregate clause with the JSON_ON aggregation function and a HAVING condition
  const havingClause = constructWhereClause(having);
  return `jsonAggJsonOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateJsonValueClause = (field: string): string => {
  // Construct a JSON aggregate clause with the JSON_VALUE aggregation function
  return `jsonAggJsonValue:${field}`;
};

export const constructJsonAggregateJsonValueOnClause = (field: string, onField: string): string => {
  // Construct a JSON aggregate clause with the JSON_VALUE_ON aggregation function
  return `jsonAggJsonValueOn:${field},${onField}`;
};

export const constructJsonAggregateJsonValueOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  // Construct a JSON aggregate clause with the JSON_VALUE_ON aggregation function and a HAVING condition
  const havingClause = constructWhereClause(having);
  return `jsonAggJsonValueOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateJsonValuePathClause = (field: string, path: string): string => {
  // Construct a JSON aggregate clause with the JSON_VALUE_PATH aggregation function
  return `jsonAggJsonValuePath:${field},${path}`;
};

export const constructJsonAggregateJsonValuePathOnClause = (field: string, path: string, onField: string): string => {
  // Construct a JSON aggregate clause with the JSON_VALUE_PATH_ON aggregation function
  return `jsonAggJsonValuePathOn:${field},${path},${onField}`;
};

export const constructJsonAggregateJsonValuePathOnHavingClause = (
  field: string,
  path: string,
  onField: string,
  having: WhereInput
): string => {
  // Construct a JSON aggregate clause with the JSON_VALUE_PATH_ON aggregation function and a HAVING condition
  const havingClause = constructWhereClause(having);
  return `jsonAggJsonValuePathOnHaving:${field},${path},${onField},${havingClause}`;
};

export const constructJsonAggregateExistsClause = (field: string): string => {
  // Construct a JSON aggregate clause with the JSON_EXISTS aggregation function
  return `jsonAggExists:${field}`;
};

export const constructJsonAggregateExistsOnClause = (field: string, onField: string): string => {
  // Construct a JSON aggregate clause with the JSON_EXISTS_ON aggregation function
  return `jsonAggExistsOn:${field},${onField}`;
};

export const constructJsonAggregateExistsOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  // Construct a JSON aggregate clause with the JSON_EXISTS_ON aggregation function and a HAVING condition
  const havingClause = constructWhereClause(having);
  return `jsonAggExistsOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateNotEmptyClause = (field: string): string => {
  // Construct a JSON aggregate clause with the JSON_NOT_EMPTY aggregation function
  return `jsonAggNotEmpty:${field}`;
};

export const constructJsonAggregateNotEmptyOnClause = (field: string, onField: string): string => {
  // Construct a JSON aggregate clause with the JSON_NOT_EMPTY_ON aggregation function
  return `jsonAggNotEmptyOn:${field},${onField}`;
};

export const constructJsonAggregateNotEmptyOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  // Construct a JSON aggregate clause with the JSON_NOT_EMPTY_ON aggregation function and a HAVING condition
  const havingClause = constructWhereClause(having);
  return `jsonAggNotEmptyOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateEmptyClause = (field: string): string => {
  // Construct a JSON aggregate clause with the JSON_EMPTY aggregation function
  return `jsonAggEmpty:${field}`;
};

export const constructJsonAggregateEmptyOnClause = (field: string, onField: string): string => {
  // Construct a JSON aggregate clause with the JSON_EMPTY_ON aggregation function
  return `jsonAggEmptyOn:${field},${onField}`;
};

export const constructJsonAggregateEmptyOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  // Construct a JSON aggregate clause with the JSON_EMPTY_ON aggregation function and a HAVING condition
  const havingClause = constructWhereClause(having);
  return `jsonAggEmptyOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateConcatClause = (field: string): string => {
  // Construct a JSON aggregate clause with the JSON_CONCAT aggregation function
  return `jsonAggConcat:${field}`;
};

export const constructJsonAggregateConcatOnClause = (field: string, onField: string): string => {
  // Construct a JSON aggregate clause with the JSON_CONCAT_ON aggregation function
  return `jsonAggConcatOn:${field},${onField}`;
};

export const constructJsonAggregateConcatOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  // Construct a JSON aggregate clause with the JSON_CONCAT_ON aggregation function and a HAVING condition
  const havingClause = constructWhereClause(having);
  return `jsonAggConcatOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateConcatDistinctClause = (field: string): string => {
  // Construct a clause for aggregating a field by concatenating distinct values
  return `jsonAggConcatDistinct:${field}`;
};

export const constructJsonAggregateConcatDistinctOnClause = (field: string, onField: string): string => {
  // Construct a clause for aggregating a field by concatenating distinct values on a specified field
  return `jsonAggConcatDistinctOn:${field},${onField}`;
};

export const constructJsonAggregateConcatDistinctOnHavingClause = (
  field: string,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field by concatenating distinct values on a specified field and having a condition
  return `jsonAggConcatDistinctOnHaving:${field},${onField},${havingClause}`;
};

export const constructJsonAggregateConcatDistinctOrderByClause = (
  field: string,
  orderBy: OrderByInput
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field by concatenating distinct values and ordering the result
  return `jsonAggConcatDistinctOrderBy:${field},${orderByClause}`;
};

export const constructJsonAggregateConcatDistinctOrderByOnClause = (
  field: string,
  orderBy: OrderByInput,
  onField: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field by concatenating distinct values on a specified field and ordering the result
  return `jsonAggConcatDistinctOrderByOn:${field},${orderByClause},${onField}`;
};

export const constructJsonAggregateConcatDistinctOrderByOnHavingClause = (
  field: string,
  orderBy: OrderByInput,
  onField: string,
  having: WhereInput
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field by concatenating distinct values on a specified field, ordering the result, and having a condition
  return `jsonAggConcatDistinctOrderByOnHaving:${field},${orderByClause},${onField},${havingClause}`;
};

export const constructJsonAggregateConcatDistinctOrderByDirectionClause = (
  field: string,
  orderBy: OrderByInput,
  direction: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field by concatenating distinct values and ordering the result in a specified direction
  return `jsonAggConcatDistinctOrderByDirection:${field},${orderByClause},${direction}`;
};

export const constructJsonAggregateConcatDistinctOrderByOnDirectionClause = (
  field: string,
  orderBy: OrderByInput,
  onField: string,
  direction: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field by concatenating distinct values on a specified field, ordering the result in a specified direction
  return `jsonAggConcatDistinctOrderByOnDirection:${field},${orderByClause},${onField},${direction}`;
};

export const constructJsonAggregateConcatDistinctOrderByOnHavingDirectionClause = (
  field: string,
  orderBy: OrderByInput,
  onField: string,
  having: WhereInput,
  direction: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field by concatenating distinct values on a specified field, ordering the result with a specified direction, and having a condition
  return `jsonAggConcatDistinctOrderByOnHavingDirection:${field},${orderByClause},${onField},${havingClause},${direction}`;
};

export const constructJsonAggregateConcatDistinctLimitClause = (field: string, limit: number): string => {
  // Construct a clause for aggregating a field by concatenating distinct values with a limit
  return `jsonAggConcatDistinctLimit:${field},${limit}`;
};

export const constructJsonAggregateConcatDistinctLimitOnClause = (
  field: string,
  limit: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field by concatenating distinct values on a specified field with a limit
  return `jsonAggConcatDistinctLimitOn:${field},${limit},${onField}`;
};

export const constructJsonAggregateConcatDistinctLimitOnHavingClause = (
  field: string,
  limit: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with distinct concatenation and limiting the result, with an optional "on" field and having a condition
  return `jsonAggConcatDistinctLimitOnHaving:${field},${limit},${onField},${havingClause}`;
};

export const constructJsonAggregateConcatDistinctLimitOrderByClause = (
  field: string,
  limit: number,
  orderBy: OrderByInput
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field with distinct concatenation and limiting the result, with ordering
  return `jsonAggConcatDistinctLimitOrderBy:${field},${limit},${orderByClause}`;
};

export const constructJsonAggregateConcatDistinctLimitOrderByOnClause = (
  field: string,
  limit: number,
  orderBy: OrderByInput,
  onField: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field with distinct concatenation and limiting the result, with ordering and an "on" field
  return `jsonAggConcatDistinctLimitOrderByOn:${field},${limit},${orderByClause},${onField}`;
};

export const constructJsonAggregateConcatDistinctLimitOrderByOnHavingClause = (
  field: string,
  limit: number,
  orderBy: OrderByInput,
  onField: string,
  having: WhereInput
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with distinct concatenation and limiting the result, with ordering, an "on" field, and having a condition
  return `jsonAggConcatDistinctLimitOrderByOnHaving:${field},${limit},${orderByClause},${onField},${havingClause}`;
};

export const constructJsonAggregateConcatDistinctLimitOrderByDirectionClause = (
  field: string,
  limit: number,
  orderBy: OrderByInput,
  direction: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field with distinct concatenation and limiting the result, with ordering and direction
  return `jsonAggConcatDistinctLimitOrderByDirection:${field},${limit},${orderByClause},${direction}`;
};

export const constructJsonAggregateConcatDistinctLimitOrderByOnDirectionClause = (
  field: string,
  limit: number,
  orderBy: OrderByInput,
  onField: string,
  direction: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  // Construct a clause for aggregating a field with distinct concatenation and limiting the result, with ordering, an "on" field, and direction
  return `jsonAggConcatDistinctLimitOrderByOnDirection:${field},${limit},${orderByClause},${onField},${direction}`;
};

export const constructJsonAggregateConcatDistinctLimitOrderByOnHavingDirectionClause = (
  field: string,
  limit: number,
  orderBy: OrderByInput,
  onField: string,
  having: WhereInput,
  direction: string
): string => {
  const orderByClause = constructOrderByClause(orderBy);
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with distinct concatenation and limiting the result, with ordering, an "on" field, having a condition, and direction
  return `jsonAggConcatDistinctLimitOrderByOnHavingDirection:${field},${limit},${orderByClause},${onField},${havingClause},${direction}`;
};

export const constructJsonAggregateSliceClause = (field: string, start: number, end: number): string => {
  // Construct a clause for slicing an aggregated field, specifying the field, start index, and end index
  return `jsonAggSlice:${field},${start},${end}`;
};

export const constructJsonAggregateSliceOnClause = (field: string, start: number, end: number, onField: string): string => {
  // Construct a clause for slicing an aggregated field with an "on" field, specifying the field, start index, end index, and the "on" field
  return `jsonAggSliceOn:${field},${start},${end},${onField}`;
};

export const constructJsonAggregateSliceOnHavingClause = (
  field: string,
  start: number,
  end: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for slicing an aggregated field with an "on" field and having a condition, specifying the field, start index, end index, "on" field, and having condition
  return `jsonAggSliceOnHaving:${field},${start},${end},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number
): string => {
  // Construct a clause for slicing an aggregated field within a range, specifying the field, start index, end index, range start, and range end
  return `jsonAggSliceRange:${field},${start},${end},${rangeStart},${rangeEnd}`;
};

export const constructJsonAggregateSliceRangeOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string
): string => {
  // Construct a clause for slicing an aggregated field within a range with an "on" field, specifying the field, start index, end index, range start, range end, and the "on" field
  return `jsonAggSliceRangeOn:${field},${start},${end},${rangeStart},${rangeEnd},${onField}`;
};

export const constructJsonAggregateSliceRangeOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for slicing an aggregated field within a range with an "on" field and having a condition, specifying the field, start index, end index, range start, range end, "on" field, and having condition
  return `jsonAggSliceRangeOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceFullClause = (field: string, start: number, end: number): string => {
  // Construct a clause for slicing an aggregated field and returning all elements, specifying the field, start index, and end index
  return `jsonAggSliceFull:${field},${start},${end}`;
};

export const constructJsonAggregateSliceFullOnClause = (
  field: string,
  start: number,
  end: number,
  onField: string
): string => {
  // Construct a clause for slicing an aggregated field and returning all elements with an "on" field, specifying the field, start index, end index, and the "on" field
  return `jsonAggSliceFullOn:${field},${start},${end},${onField}`;
};

export const constructJsonAggregateSliceFullOnHavingClause = (
  field: string,
  start: number,
  end: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for slicing an aggregated field and returning all elements with an "on" field and having a condition, specifying the field, start index, end index, "on" field, and having condition
  return `jsonAggSliceFullOnHaving:${field},${start},${end},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeFullClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number
): string => {
  // Construct a clause for slicing an aggregated field within a range and returning all elements, specifying the field, start index, end index, range start, and range end
  return `jsonAggSliceRangeFull:${field},${start},${end},${rangeStart},${rangeEnd}`;
};

export const constructJsonAggregateSliceRangeFullOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string
): string => {
  // Construct a clause for slicing an aggregated field within a range and returning all elements with an "on" field, specifying the field, start index, end index, range start, range end, and the "on" field
  return `jsonAggSliceRangeFullOn:${field},${start},${end},${rangeStart},${rangeEnd},${onField}`;
};

export const constructJsonAggregateSliceRangeFullOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for slicing an aggregated field within a range and returning all elements with an "on" field and having a condition, specifying the field, start index, end index, range start, range end, "on" field, and having condition
  return `jsonAggSliceRangeFullOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceStepClause = (
  field: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a clause for slicing an aggregated field with a step, specifying the field, start index, end index, and step
  return `jsonAggSliceStep:${field},${start},${end},${step}`;
};

export const constructJsonAggregateSliceStepOnClause = (
  field: string,
  start: number,
  end: number,
  step: number,
  onField: string
): string => {
  // Construct a clause for slicing an aggregated field with a step and an "on" field, specifying the field, start index, end index, step, and the "on" field
  return `jsonAggSliceStepOn:${field},${start},${end},${step},${onField}`;
};

export const constructJsonAggregateSliceStepOnHavingClause = (
  field: string,
  start: number,
  end: number,
  step: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for slicing an aggregated field with a step, an "on" field, and having a condition, specifying the field, start index, end index, step, "on" field, and having condition
  return `jsonAggSliceStepOnHaving:${field},${start},${end},${step},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeStepClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number
): string => {
  // Construct a clause for slicing an aggregated field within a range with a step, specifying the field, start index, end index, range start, range end, and step
  return `jsonAggSliceRangeStep:${field},${start},${end},${rangeStart},${rangeEnd},${step}`;
};

export const constructJsonAggregateSliceRangeStepOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number,
  onField: string
): string => {
  // Construct a clause for slicing an aggregated field within a range with a step and an "on" field, specifying the field, start index, end index, range start, range end, step, and the "on" field
  return `jsonAggSliceRangeStepOn:${field},${start},${end},${rangeStart},${rangeEnd},${step},${onField}`;
};

export const constructJsonAggregateSliceRangeStepOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for slicing an aggregated field within a range with a step, an "on" field, and having a condition, specifying the field, start index, end index, range start, range end, step, "on" field, and having condition
  return `jsonAggSliceRangeStepOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${step},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceReverseClause = (field: string, start: number, end: number): string => {
  // Construct a clause for slicing an aggregated field in reverse order, specifying the field, start index, and end index
  return `jsonAggSliceReverse:${field},${start},${end}`;
};

export const constructJsonAggregateSliceReverseOnClause = (
  field: string,
  start: number,
  end: number,
  onField: string
): string => {
  // Construct a clause for slicing an aggregated field in reverse order with an "on" field, specifying the field, start index, end index, and the "on" field
  return `jsonAggSliceReverseOn:${field},${start},${end},${onField}`;
};

export const constructJsonAggregateSliceReverseOnHavingClause = (
  field: string,
  start: number,
  end: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for slicing an aggregated field in reverse order with an "on" field and having a condition, specifying the field, start index, end index, "on" field, and having condition
  return `jsonAggSliceReverseOnHaving:${field},${start},${end},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeReverseClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number
): string => {
  // Construct a clause for slicing an aggregated field within a range in reverse order, specifying the field, start index, end index, range start, and range end
  return `jsonAggSliceRangeReverse:${field},${start},${end},${rangeStart},${rangeEnd}`;
};

export const constructJsonAggregateSliceRangeReverseOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string
): string => {
  // Construct a clause for slicing an aggregated field within a range in reverse order with an "on" field, specifying the field, start index, end index, range start, range end, and the "on" field
  return `jsonAggSliceRangeReverseOn:${field},${start},${end},${rangeStart},${rangeEnd},${onField}`;
};

export const constructJsonAggregateSliceRangeReverseOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with slicing in reverse order within a range, on a specified field, and having a condition
  return `jsonAggSliceRangeReverseOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceFullReverseClause = (field: string, start: number, end: number): string => {
  // Construct a clause for aggregating a field with full reverse slicing, specifying the field, start index, and end index
  return `jsonAggSliceFullReverse:${field},${start},${end}`;
};

export const constructJsonAggregateSliceFullReverseOnClause = (
  field: string,
  start: number,
  end: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with full reverse slicing on a specified field, specifying the field, start index, end index, and on-field
  return `jsonAggSliceFullReverseOn:${field},${start},${end},${onField}`;
};

export const constructJsonAggregateSliceFullReverseOnHavingClause = (
  field: string,
  start: number,
  end: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with full reverse slicing on a specified field, specifying the field, start index, end index, on-field, and having a condition
  return `jsonAggSliceFullReverseOnHaving:${field},${start},${end},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeFullReverseClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number
): string => {
  // Construct a clause for aggregating a field with range-based full reverse slicing, specifying the field, start index, end index, range start index, and range end index
  return `jsonAggSliceRangeFullReverse:${field},${start},${end},${rangeStart},${rangeEnd}`;
};

export const constructJsonAggregateSliceRangeFullReverseOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with range-based full reverse slicing on a specified field, specifying the field, start index, end index, range start index, range end index, and on-field
  return `jsonAggSliceRangeFullReverseOn:${field},${start},${end},${rangeStart},${rangeEnd},${onField}`;
};

export const constructJsonAggregateSliceRangeFullReverseOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with range-based full reverse slicing on a specified field, specifying the field, start index, end index, range start index, range end index, on-field, and having a condition
  return `jsonAggSliceRangeFullReverseOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceStepReverseClause = (
  field: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with step-based reverse slicing, specifying the field, start index, end index, and step
  return `jsonAggSliceStepReverse:${field},${start},${end},${step}`;
};

export const constructJsonAggregateSliceStepReverseOnClause = (
  field: string,
  start: number,
  end: number,
  step: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with step-based reverse slicing on a specified field, specifying the field, start index, end index, step, and on-field
  return `jsonAggSliceStepReverseOn:${field},${start},${end},${step},${onField}`;
};

export const constructJsonAggregateSliceStepReverseOnHavingClause = (
  field: string,
  start: number,
  end: number,
  step: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with step-based reverse slicing on a specified field, specifying the field, start index, end index, step, on-field, and having a condition
  return `jsonAggSliceStepReverseOnHaving:${field},${start},${end},${step},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeStepReverseClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with range-based step reverse slicing, specifying the field, start index, end index, range start index, range end index, and step
  return `jsonAggSliceRangeStepReverse:${field},${start},${end},${rangeStart},${rangeEnd},${step}`;
};

export const constructJsonAggregateSliceRangeStepReverseOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with range-based step reverse slicing on a specified field, specifying the field, start index, end index, range start index, range end index, step, and on-field
  return `jsonAggSliceRangeStepReverseOn:${field},${start},${end},${rangeStart},${rangeEnd},${step},${onField}`;
};

export const constructJsonAggregateSliceRangeStepReverseOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with range-based step reverse slicing on a specified field, specifying the field, start index, end index, range start index, range end index, step, on-field, and having a condition
  return `jsonAggSliceRangeStepReverseOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${step},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceDistinctClause = (
  field: string,
  start: number,
  end: number
): string => {
  // Construct a clause for aggregating a field with distinct slicing, specifying the field, start index, and end index
  return `jsonAggSliceDistinct:${field},${start},${end}`;
};

export const constructJsonAggregateSliceDistinctOnClause = (
  field: string,
  start: number,
  end: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with distinct slicing on a specified field, specifying the field, start index, end index, and on-field
  return `jsonAggSliceDistinctOn:${field},${start},${end},${onField}`;
};

export const constructJsonAggregateSliceDistinctOnHavingClause = (
  field: string,
  start: number,
  end: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with distinct slicing on a specified field, specifying the field, start index, end index, on-field, and having a condition
  return `jsonAggSliceDistinctOnHaving:${field},${start},${end},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeDistinctClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number
): string => {
  // Construct a clause for aggregating a field with range-based distinct slicing, specifying the field, start index, end index, range start index, and range end index
  return `jsonAggSliceRangeDistinct:${field},${start},${end},${rangeStart},${rangeEnd}`;
};

export const constructJsonAggregateSliceRangeDistinctOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with range-based distinct slicing on a specified field, specifying the field, start index, end index, range start index, range end index, and on-field
  return `jsonAggSliceRangeDistinctOn:${field},${start},${end},${rangeStart},${rangeEnd},${onField}`;
};

export const constructJsonAggregateSliceRangeDistinctOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with range-based distinct slicing on a specified field, specifying the field, start index, end index, range start index, range end index, on-field, and having a condition
  return `jsonAggSliceRangeDistinctOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceFullDistinctClause = (
  field: string,
  start: number,
  end: number
): string => {
  // Construct a clause for aggregating a field with full distinct slicing, specifying the field, start index, and end index
  return `jsonAggSliceFullDistinct:${field},${start},${end}`;
};

export const constructJsonAggregateSliceFullDistinctOnClause = (
  field: string,
  start: number,
  end: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with full distinct slicing on a specified field, specifying the field, start index, end index, and on-field
  return `jsonAggSliceFullDistinctOn:${field},${start},${end},${onField}`;
};

export const constructJsonAggregateSliceFullDistinctOnHavingClause = (
  field: string,
  start: number,
  end: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with full distinct slicing on a specified field, specifying the field, start index, end index, on-field, and having a condition
  return `jsonAggSliceFullDistinctOnHaving:${field},${start},${end},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeFullDistinctClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number
): string => {
  // Construct a clause for aggregating a field with range-based full distinct slicing, specifying the field, start index, end index, range start index, and range end index
  return `jsonAggSliceRangeFullDistinct:${field},${start},${end},${rangeStart},${rangeEnd}`;
};

export const constructJsonAggregateSliceRangeFullDistinctOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with range-based full distinct slicing on a specified field, specifying the field, start index, end index, range start index, range end index, and on-field
  return `jsonAggSliceRangeFullDistinctOn:${field},${start},${end},${rangeStart},${rangeEnd},${onField}`;
};

export const constructJsonAggregateSliceRangeFullDistinctOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with range-based full distinct slicing on a specified field, specifying the field, start index, end index, range start index, range end index, on-field, and having a condition
  return `jsonAggSliceRangeFullDistinctOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceStepDistinctClause = (
  field: string,
  start: number,
  end: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with step-based distinct slicing, specifying the field, start index, end index, and step
  return `jsonAggSliceStepDistinct:${field},${start},${end},${step}`;
};

export const constructJsonAggregateSliceStepDistinctOnClause = (
  field: string,
  start: number,
  end: number,
  step: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with step-based distinct slicing on a specified field, specifying the field, start index, end index, step, and on-field
  return `jsonAggSliceStepDistinctOn:${field},${start},${end},${step},${onField}`;
};

export const constructJsonAggregateSliceStepDistinctOnHavingClause = (
  field: string,
  start: number,
  end: number,
  step: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with step-based distinct slicing on a specified field, specifying the field, start index, end index, step, on-field, and having a condition
  return `jsonAggSliceStepDistinctOnHaving:${field},${start},${end},${step},${onField},${havingClause}`;
};

export const constructJsonAggregateSliceRangeStepDistinctClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number
): string => {
  // Construct a clause for aggregating a field with range-based step distinct slicing, specifying the field, start index, end index, range start index, range end index, and step
  return `jsonAggSliceRangeStepDistinct:${field},${start},${end},${rangeStart},${rangeEnd},${step}`;
};

export const constructJsonAggregateSliceRangeStepDistinctOnClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number,
  onField: string
): string => {
  // Construct a clause for aggregating a field with range-based step distinct slicing on a specified field, specifying the field, start index, end index, range start index, range end index, step, and on-field
  return `jsonAggSliceRangeStepDistinctOn:${field},${start},${end},${rangeStart},${rangeEnd},${step},${onField}`;
};

export const constructJsonAggregateSliceRangeStepDistinctOnHavingClause = (
  field: string,
  start: number,
  end: number,
  rangeStart: number,
  rangeEnd: number,
  step: number,
  onField: string,
  having: WhereInput
): string => {
  const havingClause = constructWhereClause(having);
  // Construct a clause for aggregating a field with range-based step distinct slicing on a specified field, specifying the field, start index, end index, range start index, range end index, step, on-field, and having a condition
  return `jsonAggSliceRangeStepDistinctOnHaving:${field},${start},${end},${rangeStart},${rangeEnd},${step},${onField},${havingClause}`;
};