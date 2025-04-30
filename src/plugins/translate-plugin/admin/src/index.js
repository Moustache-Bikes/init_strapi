import React from 'react';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';

import CustomButton from './components/CustomButton'; // Tu vas le créer ensuite

export default {
  register(app) {

    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'Traduction',
      },
      Component: async () => {
        const component = await import('./pages/App');
        return component;
      },
    });


    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name: pluginPkg.strapi.name,
    });

    // Injecter le bouton dans tous les content-types (à droite)
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'translate-plugin-button',
      Component: CustomButton,
    });
  },

  bootstrap() { },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map(async (locale) => {
        try {
          const data = await import(`./translations/${locale}.json`);
          return { data: data.default, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );

    return importedTrads;
  },
};

