using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Model;

namespace WebAPI.Controllers
{
    public class RolesController : ApiController
    {
        private readonly Services.IRoleService _roleService;

        public RolesController(Services.IRoleService RoleService)
        {
            _roleService = RoleService;

        }

        // GET api/Roles
        public List<Role> GetRoles()
        {
            return _roleService.GetAll();
        }

        // GET api/Roles/1/10
        [HttpGet]
        [Route("api/Roles/{PageNumber}/{PageSize}/{SortBy}")]
        [ResponseType(typeof(List<Role>))]
        public List<Role> GetRoles(int PageNumber,int PageSize, string SortBy = "")
        {
            return _roleService.GetAll(PageNumber,PageSize,SortBy);
        }

        // GET api/Roles/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult GetRole(int id)
        {
            Role role = _roleService.GetRole(id);
            if (role == null)
            {
                return NotFound();
            }

            return Ok(role);
        }

        // PUT api/Roles/5
        public IHttpActionResult PutRole(int id, Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != role.RoleID)
            {
                return BadRequest();
            }

            try
            {
                _roleService.UpdateRole(role);
                _roleService.SaveRole();
            }
            catch (Exception ex)
            {
                if (!RoleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Roles
        [ResponseType(typeof(Role))]
        public IHttpActionResult PostRole(Role role)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _roleService.CreateRole(role);
            _roleService.SaveRole();

            return CreatedAtRoute("DefaultApi", new { id = role.RoleID }, role);
        }

        // DELETE api/Roles/5
        [ResponseType(typeof(Role))]
        public IHttpActionResult DeleteRole(int id)
        {
            Role role = _roleService.GetRole(id);
            if (role == null)
            {
                return NotFound();
            }
            _roleService.DeleteRole(role);
            _roleService.SaveRole();

            return Ok(role);
        }


        private bool RoleExists(int id)
        {
            Role role = _roleService.GetRole(id);
            return role != null;
        }

        [HttpGet]
        [Route("api/Roles/getFeaturesRights/")]
        public object getFeaturesRights()
        {

            return _roleService.getFeaturesRights();
        }



        [HttpGet]
        [Route("api/Roles/getRoleSideMenu/")]
        public object getRoleSideMenu()
        {
            Helpers.SecurityHelper _security = new Helpers.SecurityHelper();
            int role_id = _security.getRoleIDFromToken();
            return _roleService.getRoleSideMenu(role_id);
        }
        [HttpGet]
        [Route("api/Roles/CanAccess/{right_id:int}")]
        public bool canAccess(int right_id) {
            Helpers.SecurityHelper _security = new Helpers.SecurityHelper();
            int role_id = _security.getRoleIDFromToken();
            return _roleService.canAccess(role_id, right_id);
        }
    }
}