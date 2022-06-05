import type { ReactText } from 'react';
import React from 'react';
import { Button } from 'antd';
import type {
  baseFormDateTpl,
  baseFormMyRadioTpl,
  baseFormMyCheckboxTpl,
  baseFormMySelectTpl,
  baseFormNumberTpl,
  baseFormTextAreaTpl,
  baseFormTextTpl,
  baseFormTextTipTpl,
  baseFormUnionType,
} from '@/components/PanelComponents/FormEditor/types';
import type { baseFormPickerTpl } from '@/components/FormComponents/types';

// 维护表单控件， 提高form渲染性能

type TBaseForm = {
  [key in baseFormUnionType]: any;
};

const BaseForm: TBaseForm = {
  Text: (props: baseFormTextTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <Button
        style={{
          color: '#fff',
          backgroundColor: '#4A4A4A',
          borderRadius: '2px',
          lineHeight: '0px',
        }}
        onChange={() => onChange}
      >
        {label}
      </Button>
    );
  },
  Textarea: (props: baseFormTextAreaTpl & { onChange: (v: string | undefined) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4A4A4A' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  Number: (props: baseFormNumberTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4A4A4A' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  MyRadio: (props: baseFormMyRadioTpl & { onChange: (v: string | undefined | number) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4A4A4A' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  MyCheckbox: (
    props: baseFormMyCheckboxTpl & { onChange: (v: ReactText[] | undefined) => void },
  ) => {
    const { label, onChange } = props;
    return (
      <div>
        <Button style={{ color: '#fff', backgroundColor: '#4A4A4A' }} onChange={() => onChange}>
          {label}
        </Button>
      </div>
    );
  },
  Date: (props: baseFormDateTpl & { onChange: (v: Date) => void }) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4A4A4A' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  MySelect: (
    props: baseFormMySelectTpl & { onChange: ((v: Record<string, any>) => void) | undefined },
  ) => {
    const { label, onChange } = props;
    return (
      <Button style={{ color: '#fff', backgroundColor: '#4A4A4A' }} onChange={() => onChange}>
        {label}
      </Button>
    );
  },
  MyTextTip: (props: baseFormTextTipTpl) => {
    const { label } = props;
    return (
      <Button
        style={{
          color: '#fff',
          backgroundColor: '#4A4A4A',
          borderRadius: '2px',
          lineHeight: '0px',
        }}
      >
        {label}
      </Button>
    );
  },
  Picker: (props: baseFormPickerTpl) => {
    const { label } = props;
    return (
      <Button
        style={{
          color: '#fff',
          backgroundColor: '#4A4A4A',
          borderRadius: '2px',
          lineHeight: '0px',
        }}
      >
        {label}
      </Button>
    );
  },
};

export default BaseForm;
