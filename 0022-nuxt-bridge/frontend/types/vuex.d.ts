import { NuxtApolloConfiguration } from "@nuxtjs/apollo/types/nuxt";
import { Options } from "@nuxtjs/i18n";
import { accessorType } from "~/store";

declare module "vue/types/vue" {
  interface Vue {
    $accessor: typeof accessorType;
  }
}

declare module "@nuxt/types" {
  interface NuxtAppOptions {
    $accessor: typeof accessorType;
  }
}

// FIXME: @nuxt/bridge の NuxtConfig が @nuxt/types から移植されたら外す
//        https://github.com/nuxt-community/i18n-module/blob/b6039d2215945319fdbd1acf8dc981cc55c3bc8d/types/vue.d.ts#L64-L76
declare module '@nuxt/schema' {
  interface NuxtConfig {
    i18n?: Options
  }
}

// FIXME: @nuxt/bridge の NuxtConfig が @nuxt/types から移植されたら外す
//        https://github.com/nuxt-community/apollo-module/blob/83e46428540ca57dd84c99453a5e454dbc40946b/types/nuxt.d.ts#L43-L55
declare module '@nuxt/schema' {
  interface NuxtConfig {
    apollo?: NuxtApolloConfiguration
  }
}
