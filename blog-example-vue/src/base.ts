import { Vue } from 'vue-class-component';

import store from '@/store';

export class ComponentRoot extends Vue {
    $store!: typeof store;
}
