import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'gogo',
    icon: 'iconsminds-library',
    label: 'menu.gogo',
    to: `${adminRoot}/process`
  },
  // {
  //   id: 'secondmenu',
  //   icon: 'iconsminds-add-file',
  //   label: 'menu.second-menu',
  //   to: `${adminRoot}/second-menu`
  // },
  {
    id: 'blankpage',
    icon: 'iconsminds-profile',
    label: 'menu.blank-page',
    to: `${adminRoot}/blank-page`
  },
  {
    id: 'docs',
    icon: 'simple-icon-doc',
    label: 'menu.docs',
    to: `${adminRoot}/reportes`
  }
];
export default data;
