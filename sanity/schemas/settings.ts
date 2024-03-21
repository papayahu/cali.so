import { defineField, defineType } from 'sanity'

import { FilterHorizontalIcon } from '~/assets'

export default defineType({
  name: 'settings',
  title: '網站設置',
  type: 'document',
  icon: FilterHorizontalIcon,
  fields: [
    defineField({
      name: 'projects',
      title: '項目展示列表',
      description: '在 `/projects` 頁面展示的項目列表',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    }),

    defineField({
      name: 'heroPhotos',
      title: '首頁圖片',
      description: '首頁頂部的幾張圖片（推薦設置 6 張）',
      type: 'array',
      of: [{ type: 'image' }],
    }),

    defineField({
      name: 'resume',
      title: '簡歷',
      description: '在主頁側邊欄展示的簡歷訊息（留空就不展示）',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'company',
              title: '公司名稱',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: '職位',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: '公司 Logo',
              description: '建議尺寸 100x100px 正方形裁切',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'start',
              title: '開始時間',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'end',
              title: '結束時間（留空會顯示“至今”）',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              company: 'company',
              title: 'title',
              logo: 'logo',
              start: 'start',
              end: 'end',
            },
            prepare: (selection) => ({
              title: `${selection.company} - ${selection.title}`,
              subtitle: `${selection.start} - ${selection.end ?? '至今'}`,
              media: selection.logo,
            }),
          },
        },
      ],
    }),
  ],

  preview: {
    select: {},
    prepare: () => ({
      title: '網站設置',
    }),
  },
})
