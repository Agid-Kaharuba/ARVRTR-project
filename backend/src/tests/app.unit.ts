import { Server } from 'http';

// Models
import Course from '../model/course';
import Recipe from '../model/recipe';
import Task from '../model/task';
import User from '../model/user';

// Override database name
process.env.DATABASE_NAME = 'unit-test';

describe('Prepare Unit Test', () => {
  let server: Server;

  beforeEach(() => {
    // We will create a new instance of the server for each test
    server = require('../app');
  });

  afterEach(() => {
    // Make sure to stop the process when not needed
    server.close();
  });

  it('should empty Course', async () => {
    await Course.deleteMany({});
  });
  it('should empty Recipe', async () => {
    await Recipe.deleteMany({});
  });
  it('should empty Task', async () => {
    await Task.deleteMany({});
  });
  it('should empty User', async () => {
    await User.deleteMany({});
  });
});
