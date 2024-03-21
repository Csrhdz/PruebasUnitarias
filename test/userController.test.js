const UserController = require('../controllers/UserController');
const UserModel = require('../models/UserModel');

jest.mock('../models/UserModel');

describe('UserController', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Alice' }];
      UserModel.getAllUsers.mockResolvedValue(users);
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      await UserController.getAllUsers(req, res);
      expect(res.json).toHaveBeenCalledWith(users);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      UserModel.getAllUsers.mockRejectedValue(new Error(errorMessage));
      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      await UserController.getAllUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('getUserById', () => {
    it('should return user by ID', async () => {
      const user = { id: 1, name: 'John' };
      UserModel.getUserById.mockResolvedValue(user);
      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      await UserController.getUserById(req, res);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it('should return 404 if user not found', async () => {
      UserModel.getUserById.mockResolvedValue(undefined);
      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      await UserController.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal server error';
      UserModel.getUserById.mockRejectedValue(new Error(errorMessage));
      const req = { params: { id: 1 } };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      await UserController.getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});