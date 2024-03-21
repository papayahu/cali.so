import { defineField, defineType } from 'sanity'

import { ScriptIcon } from '~/assets'

export default defineType({
  name: 'category',
  title: '分類',
  type: 'document',
  icon: ScriptIcon,
  fields: [
    defineField({
      name: 'title',
      title: '名稱',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: '超連結標示符',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'description',
      title: '簡介',
      type: 'text',
    }),
  ],
})
