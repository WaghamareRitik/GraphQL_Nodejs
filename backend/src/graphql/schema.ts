import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Project {
    id: ID!
    name: String!
    description: String
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String
  }

  type Query {
    users(limit: Int, offset: Int): [User]

    user(id: ID!): User

    projects(limit: Int, offset: Int): [Project]

    project(id: ID!): Project

    tasks(limit: Int, offset: Int, status: String, projectId: ID): [Task]
  }

  type Mutation {
    createUser(name: String!, email: String!): User

    createProject(name: String!, description: String, createdBy: ID!): Project

    createTask(
      title: String!
      description: String
      projectId: ID!
      assignedTo: ID
    ): Task

    updateTaskStatus(taskId: ID!, status: String!): Task

    deleteTask(taskId: ID!): Boolean
  }
`;
