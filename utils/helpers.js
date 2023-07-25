exports.customErrorMessages = (error) => {
  if (error.isJoi) {
    if (error.details[0].type === 'any.required') {
      return `${error.details[0].context.label} is required`;
    }
    if (error.details[0].type === 'string.regex.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'string.email') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'string.min') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'string.max') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'string.empty') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'string.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'number.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'number.min') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'number.max') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'number.empty') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'number.integer') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'date.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'date.empty') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'date.min') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'date.max') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'date.format') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'boolean.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'boolean.empty') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'object.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'object.empty') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'object.unknown') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'array.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'array.empty') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'array.includesRequiredUnknowns') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'array.includes') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'array.includesSingle') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'array.includesOne') {
      return `${error.details[0].context.label} is invalid`;
    }
    if (error.details[0].type === 'string.pattern.base') {
      return `${error.details[0].context.label} is invalid`;
    }
    return error.details[0].message;
  } else if (error.name === 'MongoServerError') {
    error.status = 422;
    if (error.code === 11000) {
      return `${Object.keys(error.keyValue)} already exists`;
    }
  } else {
    error.status = 500;
    return error.message;
  }
};
