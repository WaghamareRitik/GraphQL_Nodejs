import { gql } from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    projects: [Project]
    assignedTask: [Task]
  }

  type Project {
    id: ID!
    name: String!
    description: String
    createdBy: User
    tasks(limit: Int, offset: Int): [Task]
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String
    project: Project
    assignedTo: User
  }

  type Query {
    me: User
    users(limit: Int, offset: Int): [User]
    user(id: ID!): User
    projects(limit: Int, offset: Int): [Project]
    project(id: ID!): Project
    tasks(limit: Int, offset: Int, status: String, projectId: ID): [Task]
  }

  type Mutation {
    createUser(name: String!, email: String!): User

    createProject(name: String!, description: String): Project

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
