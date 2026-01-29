

export const usersValidationSchemaSign = {
  name: {
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "The name must be of 3-10 character to satisfy",
    },
    notEmpty: {
      errorMessage: "The name must not be empty",
    },
    isString: {
      errorMessage: "The name must be in string form",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "The email must not be empty",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
    isString: {
      errorMessage: "The email must be in string form",
    },
  },
  password: {
    isLength: {
      options: {
        min: 3,
        max: 100,
      },
      errorMessage: "The password must be of 3-10 character to satisfy",
    },
    notEmpty: {
      errorMessage: "The password must not be empty",
    },

    isString: {
      errorMessage: "The password must be in string form",
    },
  },
};


export const usersValidationSchemaLogin = {
  email: {
    notEmpty: {
      errorMessage: "The email must not be empty",
    },
    isEmail: {
      errorMessage: "Invalid email",
    },
    isString: {
      errorMessage: "The email must be in string form",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "The password must not be empty",
    }
  },
};
export const noteValidationSchema = {
  note: {
    notEmpty: {
      errorMessage: "The note must not be empty",
    }
  },
  content: {
    notEmpty: {
      errorMessage: "The content must not be empty",
    }
  },
};
