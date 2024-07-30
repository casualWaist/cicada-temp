import {SVGDefs} from "@/components/DoorsSVG"

const SvgArrow = (props: JSX.IntrinsicElements['svg']) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 150 200 200" {...props}>
        <SVGDefs />
        <path
            d="M228.831 276.74c-3.119 6.184-7.962 7.794-12.722 7.915-8.963.23-13.864-7.813-13.229-14.516.394-4.171 3.252-7.181 7.439-8.265 4.028-1.041 7.486 1.131 9.038 3.883 1.781 3.158.97 6.963-1.373 8.788-3.828 2.983-10.733.959-10.616-5.4-1.922 4.32 1.481 8.582 4.565 9.65 3.42 1.189 7.829.109 10.449-2.39 3.513-3.353 4.113-9.825 2.043-12.893-3.025-4.48-7.996-10.605-21.81-7.459-8.831 2.012-17.365 6.878-22.679 14.336-5.778 8.106-10.726 18.843-7.026 28.278 1.938 4.944 6.581 9.579 13.428 9.751 6.222.156 10.472-4.959 10.534-9.283.051-3.497-3.146-10.995-9.306-9.112 4.959 1.322 8.694 10.628.312 13.229-4.39 1.361-9.412-3.31-9.272-8.78.125-4.85 5.112-9.517 10.079-9.404 5.205.117 13.236 3.556 13.065 14.16-.168 10.508-13.428 18.301-22.504 12.929L62.164 250l117.082-62.157c9.076-5.372 22.336 2.421 22.504 12.929.171 10.604-7.86 14.043-13.065 14.16-4.967.113-9.954-4.554-10.079-9.404-.14-5.47 4.882-10.141 9.272-8.78 8.382 2.601 4.647 11.907-.312 13.229 6.16 1.883 9.357-5.615 9.306-9.112-.062-4.324-4.312-9.439-10.534-9.283-6.847.172-11.49 4.807-13.428 9.751-3.7 9.435 1.248 20.172 7.026 28.278 5.314 7.458 13.848 12.324 22.679 14.336 13.814 3.146 18.785-2.979 21.81-7.459 2.07-3.068 1.47-9.54-2.043-12.893-2.62-2.499-7.029-3.579-10.449-2.39-3.084 1.068-6.487 5.33-4.565 9.65-.117-6.359 6.788-8.383 10.616-5.4 2.343 1.825 3.154 5.63 1.373 8.788-1.552 2.752-5.01 4.924-9.038 3.883-4.187-1.084-7.045-4.094-7.439-8.265-.635-6.703 4.266-14.746 13.229-14.516 4.76.121 9.603 1.731 12.722 7.915 5.583 11.076-2.897 25.443-15.667 26.74 12.77 1.297 21.25 15.664 15.667 26.74"
            style={{
                fill: "#1c1917",
                strokeLinejoin: "round",
                strokeWidth: ".5px",
                stroke: "url(#gradient3)",
            }}
        />
        <path
            d="M201.713 252.157c-9.377 2.226-19.101 7.896-25.037 15.915-5.979 8.46-11.135 21.148-7.48 32.079.906 2.207.903 1.956 1.508 2.943L70.695 250l100.025-53.11c-.62 1.013-.653.843-1.563 3.06-3.654 10.934 1.56 23.547 7.538 32.005 5.939 8.021 15.683 13.672 25.059 15.898 3.469.735 3.436 3.567-.041 4.304Z"
            style={{
                fill: "url(#gradient2)",
            }}
        />
        <path
            d="M166.824 261.22c-6.285 9.216-8.184 14.382-9.52 21.175L96.284 250l60.995-32.385c1.433 6.965 3.617 12.471 9.911 21.664 6.977 8.679 8.099 9.207 10.425 10.706-2.712 1.756-3.93 2.603-10.791 11.235Z"
            style={{
                fill: "none",
                stroke: "#d1b06a",
                strokeWidth: ".5px",
            }}
        />
        <path
            d="M168.584 298.423s-6.307-3.198-7.771-3.975l-78.73-41.798-4.99-2.65 4.99-2.65 78.667-41.769c.539-.286 7.902-4.478 7.902-4.478l-.943 7.663s-2.682 1.338-4.145 2.115L89.887 250l73.74 39.148c.408.217 4.238 2.309 4.238 2.309z"
            style={{
                fill: "url(#gradient1)",
            }}
        />
        <text x="145"
              y="260"
              fontSize="30"
              textAnchor="middle"
              fill="#dab655">
            Back
        </text>
    </svg>
);
export default SvgArrow;

