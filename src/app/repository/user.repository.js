import BaseModel from "#root/app/shared/baseModel.js";

class UserRepository extends BaseModel {

  table = "users"

}

export default new UserRepository();