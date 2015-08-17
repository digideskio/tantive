import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import Sequelize from 'sequelize';

import db from '../db';


// This is the SQL model for an addon; an analogue for a subclass of Django's
// models.Model class.
export let Addon = db.define('addon', {
  id: {
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: Sequelize.UUID
  },
  name: {type: Sequelize.STRING},
  description: {type: Sequelize.STRING},
  developer: {type: Sequelize.STRING},
});

// This is the GraphQL object type for the Addon model; think of it like a
// django-rest-framework serializer.
export let addonType = new GraphQLObjectType({
  name: 'Add-on',
  description: 'A Firefox Add-on',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the Add-on.',
    },
    name: {
      type: GraphQLString,
      description: 'The title of the Add-on.',
    },
    description: {
      type: GraphQLString,
      description: 'The title of the Add-on.',
    },
    developer: {
      type: GraphQLString,
      description: 'The developer of the Add-on.',
    }
  }
});
