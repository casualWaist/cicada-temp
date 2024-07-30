import {SVGDefs} from "@/components/DoorsSVG"

const LivesSVG = ({lives, ...props}: {lives: 0|1|2|3|4|5|6|7|8|9|10} & JSX.IntrinsicElements['svg']) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2593.876 217.943 192.454 163.221"
    {...props}
  >
      <SVGDefs />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3933.81 2911.747c-17.26-18.375-53.569-33.129-88.726.861-20.86 20.167-24.227 63.092 0 87.045l103.74 102.59a6.3 6.3 0 0 0 8.861 0l103.78-102.59c24.227-23.952 19.887-67.254-.903-87.906-25.769-25.598-63.596-23.951-87.824 0l-19.485 19.238z"
      color="#000"
      style={{
        stroke: "url(#gradient3)",
        fill: "url(#gradient2)",
        strokeWidth: "2.59594px",
      }}
      transform="matrix(.77043 0 0 .77043 -355.467 -2010.315)"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3839.798 3014.881 10.35-10.222 102.968 101.793m-9.825 9.86 156.889-154.675"
      color="#000"
      style={{
        stroke: "url(#gradient3)",
        fill: "none",
        strokeWidth: "1.54524px",
      }}
      transform="matrix(.64715 0 0 .64715 131.893 -1640.683)"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3943.291 3116.312 105.986-104.177"
      color="#000"
      style={{
        stroke: "url(#gradient3)",
        fill: "none",
        strokeWidth: "1.54524px",
      }}
      transform="matrix(.64715 0 0 .64715 53.69 -1717.539)"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3850.148 3004.659 27.116 26.76m66.027 84.893 9.834-9.852"
      color="#000"
      style={{
        stroke: "url(#gradient3)",
        fill: "none",
        strokeWidth: "1.54524px",
      }}
      transform="matrix(.64715 0 0 .64715 103.08 -1669.156)"
    />
    <text
      x={825.535}
      y={863.144}
      style={{
        fill: "#fff",
        fontSize: "96.8px",
        textAlign: "center",
        textAnchor: "middle",
        whiteSpace: "pre",
      }}
      transform="translate(1864.712 -529.122)"
    >
      {lives}
    </text>
  </svg>
);
export default LivesSVG;

