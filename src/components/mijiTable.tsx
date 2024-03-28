import { watch, defineComponent, ref } from 'vue'
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElBadge,
  ElIcon
} from 'element-plus'

import { ArrowDownBold } from '@element-plus/icons-vue'

import { tableProps } from './props'

export default defineComponent({
  name: 'miji-table',
  props: tableProps,
  setup(props, { slots }: any) {
    const { columns, dataSource } = props
    console.log('表格数据：', dataSource);
    const tableData = ref()
    watch(() => props.dataSource, (now) => {
      tableData.value = now
    })

    const buttonEvents = (v: any, row: any) => {
      if (v.clickEvent) {
        v.clickEvent(row)
      } else {
        alert('请传入clickEvent事件参数')
      }
    }
    const renderButton = (v: any, row: any) => {
      return <ElButton
        text
        type={v.type}
        disabled={v.disabled && v.disabled(row)}
        class={v.className}
        style={{ padding: '5px' }}
        onClick={() => buttonEvents(v, row)}
      >
        {v.text}
      </ElButton>
    }
    // 渲染按钮
    const renderOptions = (btns: any, row: any) => {
      return btns && btns.map((v: any) => {
        return renderButton(v, row)
      })
    }
    // 渲染更多按钮
    const renderOptionsAndMore = (btns: any, moreBtn: any, row: any) => {
      return (<div>
        {renderOptions(btns, row)}
        {
          <ElDropdown v-slots={{
            dropdown: () => <ElDropdownMenu>
              {moreBtn.map((v: any) => {
                return <ElDropdownItem>
                  {renderButton(v, row)}
                </ElDropdownItem>
              })}
            </ElDropdownMenu>
          }}>
            <ElButton style={{ marginLeft: '10px', padding: '5px' }} type="primary" text>
              更多<ElIcon><ArrowDownBold /></ElIcon>
            </ElButton>
          </ElDropdown>
        }
      </div>)
    }

    // 渲染 type: map 的单元格
    const renderTableMapCell = (row: any, col: any) => {
      if (col.map[row[col.prop]]) {
        return <ElBadge
          is-dot={true}
          type={col.typeMap[row[col.prop]]}
          dot-position="left-middle"
        >
          {col.map[row[col.prop]]}
        </ElBadge>;
      }

      return null;
    }

    // 根据自定义表头的配置，动态生成需要的scopedSlot对象
    const genHeaderSlot = (col: any) => {
      if (col.headerSlot) {
        return {
          header: () => {
            return slots.headerSlot && slots.headerSlot();
          }
        };
      }

      return {};
    }
    // 自定义表格单元格的slot显示
    const genDefaultSlot = (col: any) => {
      if (col.slot) {
        return {
          // scope 是当前渲染单元格的数据
          default: (scope: any) => {
            return slots[col.slot] && slots[col.slot](scope);
          }
        }
      }
    }

    const initTable = () => {
      return <ElTable
        data={tableData.value}
        style={{ width: "100%" }}>
        {
          columns.map((col: any) => {
            const colWidth = col.width || '';
            const minWidth = col.minWidth || '';
            const fixed = col.fixed || false;
            const showOverflowTooltip = col.showOverflowTooltip || false
            const length = col.options && col.options.length || null
            const headerSlot = genHeaderSlot(col); // 自定义表头
            const defaultSlot = genDefaultSlot(col); // 自定义表格单元格
            const tableCellSlot = {
              ...headerSlot,
              ...defaultSlot,
            }
            // 序号
            if (col.prop === 'index') {
              return (<ElTableColumn
                label={col.label}
                type="index"
                className={col.className}
                width={55}
              />);
            }

            switch (col.type) {
              // 操作栏
              case 'options':
                return (
                  <ElTableColumn
                    prop={col.prop}
                    label={col.label}
                    className={col.className}
                    width={colWidth || (length > 3 ? '180px' : '160px')}
                    min-width={minWidth}
                    show-overflow-tooltip={showOverflowTooltip}
                    fixed={fixed}
                    formatter={(row) => {
                      let btns, moreBtn
                      if (length > 3) {
                        btns = col.options.slice(0, 2)
                        moreBtn = col.options.slice(2, length)
                      } else {
                        btns = col.options
                      }
                      return length > 3 ? renderOptionsAndMore(btns, moreBtn, row) : renderOptions(btns, row)
                    }}
                  >
                    {{ ...tableCellSlot }}
                  </ElTableColumn>
                );
              // 枚举类型的表格单元格
              case 'map':
                if (col.typeMap) { // 状态枚举
                  return (<ElTableColumn
                    prop={col.prop}
                    label={col.label}
                    className={col.className}
                    width={colWidth}
                    min-width={minWidth}
                    show-overflow-tooltip={showOverflowTooltip}
                    fixed={fixed}
                    formatter={(row): any => {
                      return renderTableMapCell(row, col);
                    }}
                  >
                    {{ ...tableCellSlot }}
                  </ElTableColumn>);
                } else { // 普通枚举
                  return (<ElTableColumn
                    prop={col.prop}
                    label={col.label}
                    className={col.className}
                    width={colWidth}
                    min-width={minWidth}
                    show-overflow-tooltip={showOverflowTooltip}
                    fixed={fixed}
                    formatter={(row) => {
                      return col.map[row[col.prop]];
                    }}
                  >
                    {{ ...tableCellSlot }}
                  </ElTableColumn>);
                }
              default:
                return (
                  <ElTableColumn
                    prop={col.prop}
                    label={col.label}
                    className={col.className}
                    width={colWidth}
                    min-width={minWidth}
                    show-overflow-tooltip={showOverflowTooltip}
                    fixed={fixed}
                  >
                    {{ ...tableCellSlot }}
                  </ElTableColumn>
                );
            }
          })
        }
      </ElTable>
    }
    return () => initTable()
  }
})