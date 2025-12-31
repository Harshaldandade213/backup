/**
 * Check if user belongs to the specified organization
 * @param {ObjectId} userOrganization - User's organization ID
 * @param {ObjectId} targetOrganization - Target organization ID
 * @returns {boolean} - True if user belongs to organization
 */
export const isUserPartOfOrganization = (userOrganization, targetOrganization) => {
  if (!userOrganization || !targetOrganization) {
    return false;
  }
  return userOrganization.toString() === targetOrganization.toString();
};

/**
 * Check if user has required role
 * @param {string} userRole - User's role
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean} - True if user has required role
 */
export const hasRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};

/**
 * Check if user is admin or super user
 * @param {string} userRole - User's role
 * @returns {boolean} - True if user is admin or super user
 */
export const isAdmin = (userRole) => {
  return ["ADMIN", "SUPER_USER"].includes(userRole);
};
