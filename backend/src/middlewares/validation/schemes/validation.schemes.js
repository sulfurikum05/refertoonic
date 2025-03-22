import Joi from "joi";

export default class Schemes {

  LoginScheme = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Please enter a valid email address',
      'string.required': 'Email is required',
    }),
    password: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be less than 50 characters',
      'string.pattern.base': 'Password can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.required': 'Password is required',
    })
  });

  RegisterScheme = Joi.object({
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).min(1).max(50).required().messages({
      'string.pattern.base': 'Name can only contain letters (A-Z, a-z)',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be less than 50 characters',
      'string.required': 'Name is required',
    }),
    surname: Joi.string().pattern(/^[A-Za-z\s]+$/).min(1).max(50).allow("").messages({
      'string.pattern.base': 'Surname can only contain letters (A-Z, a-z)',
      'string.min': 'Surname must be at least 1 character long',
      'string.max': 'Surname must be less than 50 characters',
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Please enter a valid email address',
      'string.required': 'Email is required',
    }),
    password: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be less than 50 characters',
      'string.pattern.base': 'Password can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.required': 'Password is required',
    })
  });

  UnauthMessageScheme = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Please enter a valid email address',
      'string.required': 'Email is required',
    }),
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).min(1).max(50).messages({
      'string.pattern.base': 'Name can only contain letters (A-Z, a-z)',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be less than 50 characters',
      'string.required': 'Name is required',
    }),
    text: Joi.string().pattern(/^[A-Za-z0-9\s!@#$%&*()_\-=+]+$/).min(1).max(1000).required().messages({
      'string.pattern.base': 'Message can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must be less than 1000 characters',
      'string.required': 'Message is required',
    })
  });
  
  HelpMessageScheme = Joi.object({
    subject: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(50).required().messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Subject must be at least 1 character long',
      'string.max': 'Subject must be less than 50 characters',
      'string.required': 'Subject is required',
    }),
    message: Joi.string().pattern(/^[A-Za-z0-9\s!@#$%&*()_\-=+]+$/).min(1).max(1000).required().messages({
      'string.pattern.base': 'Message can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must be less than 1000 characters',
      'string.required': 'Message is required',
    })
  });

  UserCountUpgradeScheme = Joi.object({
    userCount: Joi.number().min(5).required().messages({
      'number.min': 'User count must be at least 5',
      'number.required': 'User count is required',
      'number.base': 'User count must be a number',
    })
  });

  ConfirmEmailScheme = Joi.object({
    code: Joi.string().pattern(/^\d{6}$/).required().messages({
      'string.pattern.base': 'Confirmation code must be exactly 6 digits',
      'string.required': 'Confirmation code is required',
    })
  });

  EmailScheme = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Please enter a valid email address',
      'string.required': 'Email is required',
    })
  });
  
  ResetPasswordScheme = Joi.object({
    code: Joi.string().pattern(/^\d{6}$/).required().messages({
      'string.pattern.base': 'Confirmation code must be exactly 6 digits',
      'string.required': 'Confirmation code is required',
    }),
    newPassword: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be less than 50 characters',
      'string.pattern.base': 'Password can only contain letters, numbers, and special characters: !@#$%&*()_-+=',
      'string.required': 'Password is required',
    })
  });

  ChangePasswordScheme = Joi.object({
    oldPassword: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required().messages({
      'string.min': 'Old password must be at least 6 characters long',
      'string.max': 'Old password must be less than 50 characters',
      'string.pattern.base': 'Old password can only contain letters, numbers, and special characters: !@#$%&*()_-+=',
      'string.required': 'Old password is required',
    }),
    newPassword: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required().messages({
      'string.min': 'New password must be at least 6 characters long',
      'string.max': 'New password must be less than 50 characters',
      'string.pattern.base': 'New password can only contain letters, numbers, and special characters: !@#$%&*()_-+=',
      'string.required': 'New password is required',
    }),
    newPasswordConfirm: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required().messages({
      'string.min': 'Password confirmation must be at least 6 characters long',
      'string.max': 'Password confirmation must be less than 50 characters',
      'string.pattern.base': 'Password confirmation can only contain letters, numbers, and special characters: !@#$%&*()_-+=',
      'string.required': 'Password confirmation is required',
      'string.valid': 'Password confirmation must match the new password',
    })
  });
  
  ChangeInfoScheme = Joi.object({
    photo: Joi.string().pattern(/\.(jpeg|jpg|png)$/i).messages({
      'string.pattern.base': 'Photo must be in .jpeg, .jpg, or .png format',
    }),
    name: Joi.string().pattern(/^[A-Za-z\s]+$/).min(1).max(50).messages({
      'string.pattern.base': 'Name can only contain letters (A-Z, a-z)',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be less than 50 characters',
      'string.required': 'Name is required',
    }),
    surname: Joi.string().pattern(/^[A-Za-z\s]+$/).min(1).max(50).allow("").messages({
      'string.pattern.base': 'Surname can only contain letters (A-Z, a-z)',
      'string.min': 'Surname must be at least 1 character long',
      'string.max': 'Surname must be less than 50 characters',
    }),
    phone: Joi.string().pattern(/^\+?\d+$/).messages({
      'string.pattern.base': 'Phone number must be digits and may optionally start with a "+" sign'
    }),
    address: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+\s]+$/).min(1).max(150).messages({
      'string.pattern.base': 'Address can only contain letters, digits, and special characters like !@#$%&*()_-+=',
      'string.min': 'Address must be at least 1 character long',
      'string.max': 'Address must be less than 150 characters'
    }),
    website: Joi.string().uri({ scheme: ['http', 'https'] }).max(100).messages({
      'string.pattern.base': 'Website URL must be a valid URL format starting with "http://" or "https://"',
      'string.max': 'Website URL must be less than 100 characters'
    }),
    birthday: Joi.date().iso().max('now').messages({
      'date.base': 'Birthday must be a valid date',
      'date.max': 'Birthday cannot be in the future'
    }),
    gender: Joi.string().valid('Male', 'Female', 'Other').messages({
      'string.valid': 'Gender must be one of the following: Male, Female, Other',
      'any.required': 'Gender is required'
    }),
    about: Joi.string().pattern(/^[A-Za-z0-9\s!@#$%&*()_\-=+]+$/).min(1).max(1000).messages({
      'string.pattern.base': 'About section can only contain letters, digits, and special characters like !@#$%&*()_-+=',
      'string.min': 'About section must be at least 1 character long',
      'string.max': 'About section must be less than 1000 characters'
    })
  });

  VideoUploadScheme = Joi.object({
    video: Joi.string().pattern(/\.(mp4)$/i).messages({
      'string.pattern.base': 'Video file must have the ".mp4" extension'
    }),
    title: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(50).messages({
      'string.pattern.base': 'Title must only contain letters and numbers',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title must be less than or equal to 50 characters long'
    })
  });

  UpgradeScheme = Joi.object({  
    packageForUpgrade: Joi.string().valid('vip', 'enterprise').required().messages({
      'string.valid': 'Package for upgrade must be either "vip" or "enterprise"',
      'string.empty': 'Package for upgrade is required'
    }),
    period: Joi.string().valid('monthly', 'yearly').required().messages({
      'string.valid': 'Period must be either "monthly" or "yearly"',
      'string.empty': 'Period is required'
    })
  });
  
  CreateVipProUserScheme = Joi.object({  
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Please enter a valid email address',
      'string.required': 'Email is required',
    })
  });

  SendNotificationScheme = Joi.object({
    title: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(50).required().messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Subject must be at least 1 character long',
      'string.max': 'Subject must be less than 50 characters',
      'string.required': 'Subject is required',
    }),
    message: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+\s]+$/).min(1).max(1000).required().messages({
      'string.pattern.base': 'Message can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must be less than 1000 characters',
      'string.required': 'Message is required',
    }),
    status: Joi.string().valid('publish').required().messages({
      'string.valid': 'Status must be "publish"',
      'string.empty': 'Status is required'
    })
  });
  
  UpdateTextScheme = Joi.object({
    header: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(1000).messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Header must be at least 1 character long',
      'string.max': 'Header must be less than 1000 characters',
    }),
    title: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(1000).messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title must be less than 1000 characters',
    }),
    text: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(1000).messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Text must be at least 1 character long',
      'string.max': 'Text must be less than 1000 characters',
    }),
    id: Joi.string().pattern(/^[0-9]+$/).required().messages({
      'string.valid': 'Status must be "publish"',
      'string.empty': 'ID is required'
    })
  });

  UploadLibraryVideoScheme = Joi.object({
    gif: Joi.string().pattern(/\.(gif)$/i).required().messages({
      'string.pattern.base': 'Gif file must have the ".gif" extension'
    }),
    video: Joi.string().pattern(/\.(mp4)$/i).required().messages({
      'string.pattern.base': 'Video file must have the ".mp4" extension'
    }),
    title: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(50).messages({
      'string.pattern.base': 'Title must only contain letters and numbers',
      'string.min': 'Title must be at least 1 character long',
      'string.max': 'Title must be less than or equal to 50 characters long'
    }),
    keywords: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(150).required().messages({
      'string.pattern.base': 'Keywords must only contain letters and numbers',
      'string.min': 'Keywords must be at least 1 character long',
      'string.max': 'Keywords must be less than or equal to 50 characters long'
    })
  });

  SendMessageScheme = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
      'string.email': 'Please enter a valid email address',
      'string.required': 'Email is required',
    }),
    subject: Joi.string().pattern(/^[A-Za-z\s]+$/).min(1).max(150).messages({
      'string.pattern.base': 'Name can only contain letters (A-Z, a-z)',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be less than 150 characters',
      'string.required': 'Name is required',
    }),
    message: Joi.string().pattern(/^[A-Za-z0-9\s!@#$%&*()_\-=+]+$/).min(1).max(2000).required().messages({
      'string.pattern.base': 'Message can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must be less than 2000 characters',
      'string.required': 'Message is required',
    })
  });

  
  SendNotificationSuperadminScheme = Joi.object({
    title: Joi.string().pattern(/^[A-Za-z0-9\s]+$/).min(1).max(50).required().messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Subject must be at least 1 character long',
      'string.max': 'Subject must be less than 50 characters',
      'string.required': 'Subject is required',
    }),
    message: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+\s]+$/).min(1).max(1000).required().messages({
      'string.pattern.base': 'Message can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must be less than 1000 characters',
      'string.required': 'Message is required',
    }),
    status: Joi.string().valid('publish').required().messages({
      'string.valid': 'Status must be "publish"',
      'string.empty': 'Status is required'
    }),
    receivers: Joi.array().min(1).required().messages({
      'array.min': 'At least one receiver is required',
      'any.required': 'Receivers field is required'
    })
  });
  

  UpdatePaymentSuperadminScheme = Joi.object({
    "1": Joi.string().valid('waiting','confirmed','confirming','sending','partially_paid','failed','expired','finished').required().messages({
      'any.only': 'Status must be one of: waiting, confirmed, confirming, sending, partially_paid, failed, expired, finished',
      'any.required': 'Status is required'
    }),
  
    "2": Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    'string.pattern.base': 'Expire date must be in the format "YYYY-MM-DD"',
    'any.required': 'Expire date is required',
    'string.empty': 'Expire date cannot be empty'
  }),
  
    order_id: Joi.string().pattern(/^\d+$/).required().messages({
      'string.pattern.base': 'Order ID must contain only digits',
      'any.required': 'Order ID is required'
    })
  });
  

  EditUserPackageScheme = Joi.object({
    "3": Joi.string().valid('user', 'vip', 'admin').required().messages({
    'any.only': 'Role must be one of: user, vip, admin',
    'any.required': 'Role is required',
    'string.empty': 'Role cannot be empty'
  }),

  "4": Joi.string().required().when('3', {is: 'user',then: Joi.valid('free').messages({
      'any.only': 'If Role is "user", Package must be "free"',
    }),
      otherwise: Joi.when('3', {is: 'vip',then: Joi.valid('vip', 'vipPro').messages({
        'any.only': 'If Role is "vip", Package must be "vip" or "vipPro"',
      }),
      otherwise: Joi.valid('admin').messages({
        'any.only': 'If Role is "admin", Package must be "admin"',
      })
    })
  }).messages({
    'any.required': 'Package is required',
    'string.empty': 'Package cannot be empty'
  }),
      user_id: Joi.string().pattern(/^\d+$/).required().messages({
      'string.pattern.base': 'User ID must contain only digits',
      'any.required': 'User ID is required'
    })
  });
  
}