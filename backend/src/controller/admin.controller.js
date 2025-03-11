// Local Modules
import { AdminServices } from '../services/admin.services';
import { SuccessHandlerUtil } from '../utils';
import fs from "fs"

export class AdminController {


static async getUsers (req, res, next) {
  try {
    const role = req.role
    if (role !== "admin") {
       return res.status(401).json({ message: 'Unauthorized' });
    }else{
    const userId = req.userId
    const data = await AdminServices.getUsers(userId)
    SuccessHandlerUtil.handleList(res, next, data)
    }
  } catch (error) {
    next(error)
  }
}

static async createVipProUser (req, res, next) {
  try {
    const role = req.role
    if (role !== "admin") {
       return res.status(401).json({ message: 'Unauthorized' });
    }else{
    const userId = req.userId
    const {email} = req.body
    const data = await AdminServices.createVipProUser(userId, email)
    SuccessHandlerUtil.handleList(res, next, data)
    }
  } catch (error) {
    next(error)
  }
}

static async getAvailableUsersCount (req, res, next) {
  try {
    const userId = req.userId
    const data = await AdminServices.getAvailableUsersCount(userId)
    SuccessHandlerUtil.handleList(res, next, data)
  } catch (error) {
    next(error)
  }
}

static async blockUser (req, res, next) {
  try {
    const role = req.role
    if (role !== "admin") {
       return res.status(401).json({ message: 'Unauthorized' });
    }else{
    const email  = req.body.email
    const data = await AdminServices.blockUser(email)
    SuccessHandlerUtil.handleList(res, next, data)
    }
  } catch (error) {
    next(error)
  }
}

static async unblockUser (req, res, next) {
  try {
    const role = req.role
    if (role !== "admin") {
       return res.status(401).json({ message: 'Unauthorized' });
    }else{
    const email  = req.body.email
    const data = await AdminServices.unblockUser(email)
    SuccessHandlerUtil.handleList(res, next, data)
    }
  } catch (error) {
    next(error)
  }
}


  static async getMessagesData (req, res, next) {
    try {
      
      const userId = req.userId

      const data = await AdminServices.getMessagesData(userId)
      SuccessHandlerUtil.handleList(res, next, data)
    } catch (error) {
      next(error)
    }
  }


  static async getModerationVideos (req, res, next) {
      try {
        const role = req.role
        if (role !== "admin") {
           return res.status(401).json({ message: 'Unauthorized' });
        }else{
        const adminId = req.userId
        const data = await AdminServices.getModerationVideos(adminId)
        SuccessHandlerUtil.handleList(res, next, data)
        }
      } catch (error) {
        next(error)
      }
    }
  
  
    static async deleteModerationVideo (req, res, next) {
      try {
        const role = req.role
        if (role !== "admin") {
          return res.status(401).json({ message: 'Unauthorized' });
       }else{
        const id = req.body.id
        const data = await AdminServices.deleteModerationVideo(id)
        SuccessHandlerUtil.handleList(res, next, data)
       }
      } catch (error) {
        next(error)
      }
    }
    static async publishModerationVideo (req, res, next) {
  
      try {
        const role = req.role
        if (role !== "admin") {
          return res.status(401).json({ message: 'Unauthorized' });
       }else{
        const id = req.body.id
        const data = await AdminServices.publishModerationVideo(id, role)
        SuccessHandlerUtil.handleList(res, next, data)
       }
      } catch (error) {
        next(error)
      }
    }
    static async rejectModerationVideo (req, res, next) {
  
      try {
        const role = req.role
        if (role !== "admin") {
          return res.status(401).json({ message: 'Unauthorized' });
       }else{
        const id = req.body.id
        const data = await AdminServices.rejectModerationVideo(id)
        SuccessHandlerUtil.handleList(res, next, data)
       }
      } catch (error) {
        next(error)
      }
    }


      static async getNotificationsData (req, res, next) {
        try {
          const role = req.role
          if (role !== "admin") {
            return res.status(401).json({ message: 'Unauthorized' });
         }else{
          const userId = req.userId
          const data = await AdminServices.getNotificationsData(userId)
          SuccessHandlerUtil.handleList(res, next, data)
         }
        } catch (error) {
          next(error)
        }
      }


        static async sendNotification (req, res, next) {
          try {
            const role = req.role
            if (role !== "admin") {
              return res.status(401).json({ message: 'Unauthorized' });
           }else{
            const adminId = req.userId
            const title = req.body.title
            const message = req.body.message
            const status = req.body.status
            const data = await AdminServices.sendNotification(title, message, status, adminId)
            SuccessHandlerUtil.handleList(res, next, data)
           }
          } catch (error) {
            next(error)
          }
        }

        static async getSentNotificationsData (req, res, next) {
          try {
            const role = req.role
            if (role !== "admin") {
              return res.status(401).json({ message: 'Unauthorized' });
           }else{
            const adminId = req.userId
            const data = await AdminServices.getSentNotificationsData(adminId)
            SuccessHandlerUtil.handleList(res, next, data)
           }
          } catch (error) {
            next(error)
          }
        }


        static async upgradeUserCount (req, res, next) {
          try {
            const role = req.role
            if (role !== "admin") {
              return res.status(401).json({ message: 'Unauthorized' });
           }else{
            const adminId = req.userId
            const userCount = req.body.userCount
            const data = await AdminServices.upgradeUserCount(adminId, userCount)
            SuccessHandlerUtil.handleList(res, next, data)
           }
          } catch (error) {
            next(error)
          }
        }

        
        
}
