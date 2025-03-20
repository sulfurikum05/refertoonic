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
    name: Joi.string().pattern(/^[A-Za-z]+$/).min(1).max(50).required().messages({
      'string.pattern.base': 'Name can only contain letters (A-Z, a-z)',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be less than 50 characters',
      'string.required': 'Name is required',
    }),
    surname: Joi.string().pattern(/^[A-Za-z]+$/).min(1).max(50).allow("").messages({
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
    name: Joi.string().pattern(/^[A-Za-z]+$/).min(1).max(50).messages({
      'string.pattern.base': 'Name can only contain letters (A-Z, a-z)',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be less than 50 characters',
      'string.required': 'Name is required',
    }),
    text: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).min(1).max(1000).required().messages({
      'string.pattern.base': 'Message can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must be less than 1000 characters',
      'string.required': 'Message is required',
    })
  });
  
  HelpMessageScheme = Joi.object({
    subject: Joi.string().pattern(/^[A-Za-z0-9]+$/).min(1).max(50).required().messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Subject must be at least 1 character long',
      'string.max': 'Subject must be less than 50 characters',
      'string.required': 'Subject is required',
    }),
    message: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).min(1).max(1000).required().messages({
      'string.pattern.base': 'Message can only contain letters, numbers, and special characters (!@#$%&*()_\\-=+)',
      'string.min': 'Message must be at least 1 character long',
      'string.max': 'Message must be less than 1000 characters',
      'string.required': 'Message is required',
    })
  });

  userCountUpgradeScheme = Joi.object({
    userCount: Joi.number().min(5).required().messages({
      'number.min': 'User count must be at least 5',
      'number.required': 'User count is required',
      'number.base': 'User count must be a number',
    })
  });

  confirmEmailScheme = Joi.object({
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
    password: Joi.string().min(6).max(50).pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).required().messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password must be less than 50 characters',
      'string.pattern.base': 'Password can only contain letters, numbers, and special characters: !@#$%&*()_-+=',
      'string.required': 'Password is required',
    })
  });

  changePasswordScheme = Joi.object({
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
  
  changeInfoScheme = Joi.object({
    photo: Joi.string().pattern(/\.(jpeg|jpg|png)$/i).messages({
      'string.pattern.base': 'Photo must be in .jpeg, .jpg, or .png format',
    }),
    name: Joi.string().pattern(/^[A-Za-z]+$/).min(1).max(50).messages({
      'string.pattern.base': 'Name can only contain letters (A-Z, a-z)',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name must be less than 50 characters',
      'string.required': 'Name is required',
    }),
    surname: Joi.string().pattern(/^[A-Za-z]+$/).min(1).max(50).allow("").messages({
      'string.pattern.base': 'Surname can only contain letters (A-Z, a-z)',
      'string.min': 'Surname must be at least 1 character long',
      'string.max': 'Surname must be less than 50 characters',
    }),
    phone: Joi.string().pattern(/^\+?\d+$/).messages({
      'string.pattern.base': 'Phone number must be digits and may optionally start with a "+" sign'
    }),
    address: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).min(1).max(150).messages({
      'string.pattern.base': 'Address can only contain letters, digits, and special characters like !@#$%&*()_-+=',
      'string.min': 'Address must be at least 1 character long',
      'string.max': 'Address must be less than 150 characters'
    }),
    website: Joi.string().pattern(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i).max(100).messages({
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
    about: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).min(1).max(1000).messages({
      'string.pattern.base': 'About section can only contain letters, digits, and special characters like !@#$%&*()_-+=',
      'string.min': 'About section must be at least 1 character long',
      'string.max': 'About section must be less than 1000 characters'
    })
  });

  VideoUploadScheme = Joi.object({
    video: Joi.string().pattern(/\.(mp4)$/i).messages({
      'string.pattern.base': 'Video file must have the ".mp4" extension'
    }),
    title: Joi.string().pattern(/^[A-Za-z0-9]+$/).min(1).max(50).messages({
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
    title: Joi.string().pattern(/^[A-Za-z0-9]+$/).min(1).max(50).required().messages({
      'string.pattern.base': 'Subject can only contain letters and numbers (A-Z, a-z, 0-9)',
      'string.min': 'Subject must be at least 1 character long',
      'string.max': 'Subject must be less than 50 characters',
      'string.required': 'Subject is required',
    }),
    message: Joi.string().pattern(/^[A-Za-z0-9!@#$%&*()_\-=+]+$/).min(1).max(1000).required().messages({
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
  

}