import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "rc-switch/assets/index.css";
import drawRoadmap from "./drawRoadmap";
import * as roadMap from "./roadmap";
import "./style.css";

const options = [
  { value: "all", label: "完整路线", canvasHeight: 5000 },
  { value: "p1", label: "👶🏻 阶段1", canvasHeight: 2000 },
  { value: "p2", label: "👦🏻 阶段2", canvasHeight: 3000 },
  { value: "p3", label: "👨🏻 阶段3", canvasHeight: 2000 },
  //   { value: "p10000", label: "👴🏻 养生路线" },  // 这个也挺重要的，哈哈！(手动狗头
];

function Index() {
  const history = useHistory();

  const [process] = useState(options[0]);
  // const [height, setHeight] = useState(options[0].canvasHeight);
  const [showTag] = useState(true);

  useEffect(() => {
    const canvas = drawRoadmap(
      `roadmapCanvas`,
      roadMap[process.value],
      showTag
    );
    // canvas.setHeight(process.canvasHeight);
    const canvasMouseDownHandler = (options) => {
      if (options.target && options.target.link) {
        // 是否有跳转到markdown，从markdown返回的时候需要绘制一次
        window.__GO_TO_MARKDOWN__ = true;
        history.push(`/guide${options.target.link}`);
      }
    };
    canvas.on("mouse:down", canvasMouseDownHandler);
    return () => {
      canvas.off("mouse:down", canvasMouseDownHandler);
    };
  }, [history, process, showTag]);

  return (
    <div className="roadmap-container">
      <div className="roadmap">
        <div>
          <canvas id={`roadmapCanvas`} height="5000px" width="1000px" />
        </div>
      </div>
    </div>
  );
}

export default Index;
