using Data.Infrastructure;
using Data.Repositories;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{

    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;
        private readonly IUnitOfWork unitOfWork;

        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
        }

        #region IApplicationService Members

        public List<User> GetAll()
        {
            List<User> Users = userRepository.GetAll().ToList();
            return Users;
        } 
        public User GetUser(int id)
        {
            var application = userRepository.GetById(id);
            return application;
        }

        public void CreateUser(User application)
        {
            userRepository.Add(application);
        }

        public void UpdateUser(User user)
        {
            userRepository.Update(user.UserID,user);
        }

        public void DeleteUser(User user)
        {
            userRepository.Delete(user);
        }

        public void SaveUser()
        {
            unitOfWork.Commit();
        }

        public User UserLogin(string username, string password)
        {
            try
            {
                
                return userRepository.UserLogin(username, password);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
