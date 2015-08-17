import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from 'graphql';
import {resolver} from 'graphql-sequelize';

import {Addon, addonType} from './models/addon';


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      addons: {
        type: new GraphQLList(addonType),
        resolve: resolver(Addon)
      }
    }
  })
});
