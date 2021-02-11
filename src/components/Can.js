import rules from "../rbac-rules";

export const check = (role, action) => {
  const permissions = rules[role];
  if (!permissions) {
    // role is not present in the rules
    return false;
  }

  const staticPermissions = permissions.static;
  const dynamicPermissions = permissions.dynamic;
  
  if (staticPermissions && staticPermissions.includes(action)) {
    // static rule not provided for action
    return true;
  }
  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      // dynamic rule not provided for action
      return false;
    }

    return permissionCondition(data);
  }

  return false;
};

const Can = props =>
  check( props.role, props.perform)
    ? props.yes()
    : props.no();

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

export default Can;