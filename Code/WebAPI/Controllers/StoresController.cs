﻿using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using Model;
using Model.DTO;


namespace WebAPI.Controllers
{
    public class StoresController : ApiController
    {
        private readonly Services.IStoreService _StoreService;

        public StoresController(Services.IStoreService StoreService)
        {
            _StoreService = StoreService;

        }


        // GET api/Users
        public List<Store> GetStores()
        {
            return _StoreService.GetAll();
        }

        // GET api/Stores/1/10
        [HttpGet]
        [Route("api/Cities/{PageNumber}/{PageSize}/{SortBy}/{SortDirection}")]
        [ResponseType(typeof(Model.DTO.PagedResult<Store>))]
        public PagedResult<Store> GetStores(int PageNumber, int PageSize, string SortBy = "",string SortDirection= "")
        {
            return _StoreService.GetAll(PageNumber,PageSize,SortBy,SortDirection);
        }

        // GET api/Users/5
        [ResponseType(typeof(Store))]
        public IHttpActionResult GetStore(int id)
        {
            Store Store = _StoreService.GetStore(id);
            if (Store == null)
            {
                return NotFound();
            }

            return Ok(Store);
        }

        // PUT api/Users/5
        public IHttpActionResult PutStore(int id, Store Store)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != Store.StoreID)
            {
                return BadRequest();
            }

            try
            {
                _StoreService.UpdateStore(Store);
                _StoreService.SaveStore();
            }
            catch (Exception ex)
            {
                if (!StoreExists(id))
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

        // POST api/Users
        [ResponseType(typeof(Store))]
        public IHttpActionResult PostStore(Store Store)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _StoreService.CreateStore(Store);
            _StoreService.SaveStore();
            _StoreService.UpdateStoreCode(Store);
            return CreatedAtRoute("DefaultApi", new { id = Store.StoreID }, Store);
        }

        // DELETE api/Users/5
        [ResponseType(typeof(Store))]
        public IHttpActionResult DeleteStore(int id)
        {
            Store Store = _StoreService.GetStore(id);
            if (Store == null)
            {
                return NotFound();
            }

            _StoreService.DeleteStore(Store);
            _StoreService.SaveStore();

            return Ok(Store);
        }

        private bool StoreExists(int id)
        {
            Store Store = _StoreService.GetStore(id);
            return Store != null;
        }

        [HttpPost]
        [Route("api/Stores/FilteredList")]
        [ResponseType(typeof(Model.DTO.PagedResult<Store>))]
        public Model.DTO.PagedResult<Store> LoadFilteredUsers(FilterModel<Store> FilterObject)
        {
            //if no search is applied
            if (FilterObject.SearchObject == null)
            {
                FilterObject.SearchObject = new Model.Store();
            }
            return _StoreService.GetAll(FilterObject);
        }

    }
}