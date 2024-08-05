import * as React from "react"
import {SVGDefs} from "@/components/DoorsSVG"

export default function XButton(props: JSX.IntrinsicElements["button"]) {

    return <button {...props}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-[100px] h-[100px]"
        >
            <SVGDefs/>
            <path
                d="m87.495 50 12.505.013"
                style={{
                    stroke: "url(#gradient1)",
                    fill: "none",
                }}
            />
            <path
                d="M0 50.013 5.727 50"
                style={{
                    stroke: "url(#gradient1)",
                    fill: "none",
                    strokeWidth: ".5px",
                }}
            />
            <path
                d="M50 12.216 87.784 50 50 87.784 12.215 50z"
                style={{
                    fill: "url(#gradient2)",
                    stroke: "url(#gradient3)",
                    transformOrigin: "50px 50px",
                }}
            />
            <path
                d="m17.762 37.862 12.206 12.206-12.206 12.205L5.557 50.068z"
                style={{
                    fill: "url(#gradient2)",
                    stroke: "url(#gradient3)",
                    strokeWidth: ".5px",
                    transformOrigin: "17.762px 50.068px",
                }}
            />
            <path
                d="m31.108 31.108 37.784 37.784z"
                style={{
                    fill: "none",
                    stroke: "url(#gradient1)",
                    strokeWidth: 6,
                    transformOrigin: "31.108px 68.892px",
                }}
            />
            <path
                d="M68.892 31.108 31.108 68.892z"
                style={{
                    fill: "none",
                    stroke: "url(#gradient3)",
                    strokeWidth: 4,
                    transformOrigin: "31.108px 31.108px",
                }}
            />
        </svg>
    </button>
}

export function XFlourish(props: JSX.IntrinsicElements["svg"]) {

    return <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0.352 44.555 299.6 10.89"
        {...props}
    >
        <SVGDefs/>
        <path
            d="M86.063 55.139 91.1 49.96l-5.037-5.107-80.987.129L0 49.96l5.095 5.303z"
            style={{
                fill: "url(#gradient2)",
                stroke: "url(#gradient1)",
                strokeWidth: ".25px",
                transformOrigin: "45.55px 50.058px",
            }}
            transform="rotate(180 .176 0)"
        />
        <path
            d="m38.556 55.155 5-5-5-5-5 5z"
            style={{
                fill: "url(#gradient2)",
                stroke: "url(#gradient1)",
                strokeWidth: ".5px",
                transformOrigin: "38.556px 50.155px",
            }}
            transform="rotate(180 0 0)"
        />
        <path
            d="M189.002 52.232h75.896"
            style={{
                stroke: "url(#gradient1)",
                fill: "none",
                strokeWidth: ".5px",
                transformOrigin: "226.95px 52.232px",
            }}
            transform="matrix(-1 0 0 -1 -92.827 0)"
        />
        <path
            d="m349.256 54.108 2.271-1.879"
            style={{
                stroke: "url(#gradient1)",
                fill: "none",
                strokeWidth: ".25px",
                transformOrigin: "350.392px 53.1685px",
            }}
            transform="rotate(180 -92.827 0)"
        />
        <path
            d="M15.82 45.045h12.706l7.156 7.187"
            style={{
                stroke: "url(#gradient1)",
                fill: "none",
                strokeWidth: ".25px",
                transformOrigin: "25.751px 48.6385px",
            }}
            transform="rotate(180)"
        />
        <path
            d="m22.916 34.925 10.117 10.117z"
            style={{
                fill: "none",
                stroke: "url(#gradient1)",
                strokeWidth: ".25px",
                transformOrigin: "22.916px 45.042px",
            }}
            transform="rotate(180 0 0)"
        />
        <path
            d="m101.225 52.259 2.271-1.879"
            style={{
                stroke: "url(#gradient1)",
                fill: "none",
                strokeWidth: ".25px",
                transformOrigin: "102.361px 51.3195px",
            }}
            transform="rotate(180 0 0)"
        />
        <path d="m96.2 52.232l75.9 0.001"
              style={{
                  stroke: "url(#gradient1)",
                  fill: "none",
                  strokeWidth: ".25px",
              }}
        />
        <path
            d="M66.469 48.873h110.379l8.495 5.445 11.371-9.763h28.242l8.062 4.159h90.345"
            style={{
                stroke: "url(#gradient1)",
                fill: "none",
            }}
            transform="rotate(180 183.21 49.436)"
        />
        <path
            d="m92.854 55.445 5.404-5.404-5.404-5.404-5.404 5.404z"
            style={{
                fill: "url(#gradient2)",
                stroke: "url(#gradient1)",
                transformOrigin: "92.854px 50.041px",
            }}
            transform="rotate(180 0 0)"
        />
    </svg>
}
