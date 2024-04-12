export type Roles =
  | 'menu_dashboard' // VIEW: Pagina de Dashboard
  | 'menu_release_checkpoint' // VIEW: Pagina de Liberação de Ficha
  | 'menu_users' // VIEW: Pagina de Usuario
  | 'menu_groups' // VIEW: Pagina de Grupos
  | 'menu_consults' // VIEW: Pagina de Consulta
  | 'menu_user_groups' // VIEW: Pagina de Usuarios X Grupo
  | 'menu_permissions' // VIEW: Pagina de Permissão
  | 'menu_checkpoint' // VIEW: Pagina de Registro de Ponto
  | 'menu_schedule' // VIEW: Pagina de Agenda
  | 'permission_standard' //Permissão padrão
  | 'button_new_groups' ; //Button adicionar novo grupo

export type RolesInput = "permission_standard"; // Permissão padrão

export type RolesSelect = "permission_standard"; //Permissão padrão
