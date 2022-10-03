import { PropConfig } from "@drag/meta"

export type PropComponentProps = {
  metaProps?: any, // meta config props
  disabled: boolean,
  propValue: any, // prop item values
  children?: Array<Partial<PropConfig>>
  onChange: (v: any) => void // set and unpdate values
}