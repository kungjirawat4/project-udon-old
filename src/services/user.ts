// import { generateToken } from '@/libs/helpers';
// import { db } from '@/libs/prisma.db';

// export const getUserByEmail = async (email: string) => {
//   try {
//     const user = await db.user.findUnique({
//       where: { email },
//     });
//     return user;
//   } catch {
//     return null;
//   }
// };

// export const getUserById = async (id: string) => {
//   try {
//     const user = await db.user.findUnique({
//       where: { id },
//       include: {
//         role: {
//           select: {
//             type: true,
//           },
//         },
//       },
//     });

//     if (!user?.role) {
//       return {
//         user,
//         token: await generateToken(user?.id as string),
//       };
//     }

//     const config = await db.configure.findFirst({
//       select: {
//         hospital_logo: true,
//         hospital_initial: true,
//       },
//     });

//     const roles: any = user?.roleId
//       && (await db.role.findFirst({
//         where: {
//           id: user?.roleId,
//         },
//         include: {
//           clientPermissions: {
//             select: {
//               menu: true,
//               sort: true,
//               path: true,
//               name: true,
//             },
//           },
//         },
//       }));

//     const routes = roles.clientPermissions;

//     type Route = {
//       menu?: string;
//       name?: string;
//       path?: string;
//       open?: boolean;
//       sort?: number;
//     };
//     type RouteChildren = {
//       children?: { menu?: string; name?: string; path?: string }[] | any;
//     } & Route;
//     const formatRoutes = (routes: Route[]): RouteChildren[] => {
//       const formattedRoutes: RouteChildren[] = [];

//       routes.forEach((route): any => {
//         if (route.menu === 'hidden') {
//           return null;
//         }
//         if (route.menu === 'profile') {
//           return null;
//         }

//         if (route.menu === 'normal') {
//           formattedRoutes.push({
//             name: route.name,
//             path: route.path,
//             sort: route.sort,
//           });
//         } else {
//           const found = formattedRoutes.find(r => r.name === route.menu);
//           if (found) {
//             found.children.push({ name: route.name, path: route.path });
//           } else {
//             formattedRoutes.push({
//               name: route.menu,
//               sort: route.sort,
//               open: false,
//               children: [{ name: route.name, path: route.path }],
//             });
//           }
//         }
//       });

//       return formattedRoutes;
//     };

//     const sortMenu: any = (menu: any[]) => {
//       const sortedMenu = menu.sort((a, b) => {
//         if (a.sort === b.sort) {
//           if (a.name < b.name) {
//             return -1;
//           }
//           return 1;
//         }
//         return a.sort - b.sort;
//       });

//       return sortedMenu.map((m) => {
//         if (m.children) {
//           return {
//             ...m,
//             children: sortMenu(m.children),
//           };
//         }
//         return m;
//       });
//     };

//     return {
//       user,
//       hospital: config,
//       routes,
//       menu: sortMenu(formatRoutes(routes) as any[]),
//       token: await generateToken(user?.id as string),
//     };
//   } catch {
//     return null;
//   }
// };

// export const updateUserById = async (id: string, payload: any) => {
//   try {
//     // console.log(payload)
//     return await db.user.update({
//       where: { id },
//       data: payload,
//     });
//   } catch {
//     return null;
//   }
// };

import { generateToken } from '@/libs/helpers';
import { db } from '@/libs/prisma.db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        role: {
          select: {
            type: true,
          },
        },
      },
    });

    const config = await db.configure.findFirst({
      select: {
        hospital_logo: true,
        hospital_initial: true,
      },
    });

    if (!user?.role) {
      return {
        user,
        token: await generateToken(user?.id as string),
      };
    }

    const roles: any = user?.roleId
      && (await db.role.findFirst({
        where: {
          id: user?.roleId,
        },
        include: {
          clientPermissions: {
            select: {
              menu: true,
              sort: true,
              path: true,
              name: true,
            },
          },
        },
      }));

    const routes = roles?.clientPermissions;

    type Route = {
      menu?: string;
      name?: string;
      path?: string;
      open?: boolean;
      sort?: number;
    };
    type RouteChildren = {
      children?: { menu?: string; name?: string; path?: string }[] | any;
    } & Route;
    const formatRoutes = (routes: Route[]): RouteChildren[] => {
      const formattedRoutes: RouteChildren[] = [];

      routes.forEach((route): any => {
        if (route.menu === 'hidden') {
          return null;
        }
        if (route.menu === 'profile') {
          return null;
        }

        if (route.menu === 'normal') {
          formattedRoutes.push({
            name: route.name,
            path: route.path,
            sort: route.sort,
          });
        } else {
          const found = formattedRoutes.find(r => r.name === route.menu);
          if (found) {
            found.children.push({ name: route.name, path: route.path });
          } else {
            formattedRoutes.push({
              name: route.menu,
              sort: route.sort,
              open: false,
              children: [{ name: route.name, path: route.path }],
            });
          }
        }
      });

      return formattedRoutes;
    };

    const sortMenu: any = (menu: any[]) => {
      const sortedMenu = menu.sort((a, b) => {
        if (a.sort === b.sort) {
          if (a.name < b.name) {
            return -1;
          }
          return 1;
        }
        return a.sort - b.sort;
      });

      return sortedMenu.map((m) => {
        if (m.children) {
          return {
            ...m,
            children: sortMenu(m.children),
          };
        }
        return m;
      });
    };

    // eslint-disable-next-line no-console
    console.log(config);

    return {
      user,
      config: config?.hospital_logo,
      routes,
      menu: sortMenu(formatRoutes(routes) as any[]),
      token: await generateToken(user?.id as string),
    };
  } catch {
    return null;
  }
};

export const updateUserById = async (id: string, payload: any) => {
  try {
    // console.log(payload)
    return await db.user.update({
      where: { id },
      data: payload,
    });
  } catch {
    return null;
  }
};
