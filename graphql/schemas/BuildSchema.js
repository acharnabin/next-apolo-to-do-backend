const { gql } = require("apollo-server");

const BuildSchema = gql`
  input userInput {
    username: String!
    email: String!
  }

  input todoInput {
    title: String!
    scheduleAt: String!
    index: Int!
    _id:String
    
  }

  type useroutput {
    username: String!
    email: String!
  }

  type todoObj {
    title: String!
    scheduleAt: String!
    index: Int!
    _id: ID!
    status:String
    priority:String
  }

  type Query {
    helloWorld: String
  }

  type createUser {
    user: useroutput
  }

  # All query listed here
  type Query {
    LoginRequest(email: String!): Boolean!
    deleteTodo(id: String!): todoObj!
    fetchHistory:String,
    fetchTodayTodo:[todoObj]
  }

  # All mutation listed here
  type Mutation {
    helloWorld: String
    createUser(input: userInput): createUser
    checkOtpAndSignUp(email: String!, otp: Int!): String!
    saveTodo(input: todoInput!): todoObj!
    updateTodo(input: todoInput!): todoObj!
    
  }

  #create schema

  type schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = BuildSchema;
