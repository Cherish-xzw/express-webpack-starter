import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import user from './queries/user';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      user,
    },
  }),
});

export default schema;
