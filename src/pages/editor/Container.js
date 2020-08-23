import React, { useState, useEffect, memo } from 'react'
import { Input, Collapse, Slider, Empty } from 'antd'
import {
  PieChartOutlined,
  ExpandOutlined
} from '@ant-design/icons'
import { connect } from 'dva'
import HeaderComponent from './components/Header'
import SourceBox  from './SourceBox'
import TargetBox from './TargetBox'
import Calibration from 'components/Calibration'
import DynamicEngine from 'components/DynamicEngine'
import FormEditor from 'components/FormEditor'
import template from 'components/DynamicEngine/template'
import mediaTpl from 'components/DynamicEngine/mediaTpl'
import schema from 'components/DynamicEngine/schema'
import req from '@/utils/req'

import styles from './index.less'

const { Search } = Input;
const { Panel } = Collapse;

const Container = memo((props) => {
  const [ scaleNum , setScale ] = useState(1)

  const { pointData, curPoint, dispatch } = props

  // 指定画布的id
  let canvasId = 'js_canvas'

  const backSize = () => {
    setScale(1)
  }

  const generateHeader = (text) => {
    return <div><PieChartOutlined /> { text }</div>
  }

  const handleSliderChange = (v) => {
    setScale(prev => v >= 150 ? 1.5 : (v / 100))
  }

  const handleSlider = (type) => {
    if(type) {
      setScale(prev => prev >= 1.5 ? 1.5 : (prev + 0.1))
    }else {
      setScale(prev => prev <= 0.5 ? 0.5 : (prev - 0.1))
    }
  }

  const handleFormSave = (data) => {
    dispatch({
      type: 'editorModal/modPointData',
      payload: { ...curPoint, item: {...curPoint.item, config: data} }
    })
  }

  const handleDel = (id) => {
    dispatch({
      type: 'editorModal/delPointData',
      payload: { id }
    })
  }

  const savePreview = () => {
    const { tid } = props.location.query || ''
    req.post('/visible/preview', { tid, tpl: pointData })
  }

  useEffect(() => {

  }, [])

  return (
    <div className={styles.editorWrap}>
      <HeaderComponent pointData={pointData} location={props.location} />
      <div className={styles.container}>
        <div className={styles.list} >
          <div className={styles.searchBar}>
            <Search placeholder="搜索组件" onSearch={value => console.log(value)} enterButton />
          </div>
          <div className={styles.componentList}>
          <Collapse accordion ghost expandIconPosition="right">
            <Panel header={generateHeader("基础组件")} key="1">
              {
                template.map((value,i) => 
                  <TargetBox item={value} key={i} canvasId={canvasId}>
                    <DynamicEngine {...value} config={schema[value.type].config} />
                  </TargetBox>
                )
              }
            </Panel>
            <Panel header={generateHeader("媒体组件")} key="2">
              {
                mediaTpl.map((value,i) => 
                  <TargetBox item={value} key={i} canvasId={canvasId}>
                    <DynamicEngine {...value} config={schema[value.type].config} />
                  </TargetBox>
                )
              }
            </Panel>
            <Panel header={generateHeader("可视化组件")} key="3">
              正在开发中...
            </Panel>
          </Collapse>
          </div>
        </div>
        <div className={styles.tickMark} id='calibration'>
          <div className={styles.tickMarkTop}>
            <Calibration direction='up' id='calibrationUp' multiple={scaleNum} />
          </div> 
          <div className={styles.tickMarkLeft}>
            <Calibration direction='right' id='calibrationRight' multiple={scaleNum} />
          </div>
          <SourceBox scaleNum={scaleNum} canvasId={canvasId} />
          <div className={styles.sliderWrap}>
            <span className={styles.sliderBtn} onClick={handleSlider.bind(this, 0)}>-</span>
            <Slider defaultValue={100} className={styles.slider} onChange={handleSliderChange} min={50} max={150} value={scaleNum * 100} />
            <span className={styles.sliderBtn} onClick={handleSlider.bind(this, 1)}>+</span>
          </div>
          <div className={styles.backSize}><ExpandOutlined onClick={backSize} /></div>
        </div>
        <div className={styles.attrSetting}>
          {
            pointData.length && curPoint ?
            <>
              <div className={styles.tit}>属性设置</div>
              <FormEditor 
                config={curPoint.item.editableEl}
                uid={curPoint.id} 
                defaultValue={curPoint.item.config} 
                onSave={handleFormSave}
                onDel={handleDel}
              />
            </> :
            <div style={{paddingTop: '100px'}}><Empty /></div>
          }
          
        </div>
      </div>

    </div>
  )
})

export default connect(({ editorModal: { pointData, curPoint } }) => ({
  pointData, curPoint
}))(Container)
