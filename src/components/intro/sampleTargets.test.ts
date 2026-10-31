import { describe, expect, it } from "vitest";
import { sampleHands } from "./sampleTargets";

const image = { width: 8, height: 4, data: new Uint8ClampedArray(8 * 4 * 4).fill(180) };
const options = {
  robotCount: 12,
  humanCount: 12,
  contactU: 0.5,
  contactV: 0.5,
  worldWidth: 12,
  seed: 42,
};

describe("hand particle ownership", () => {
  it("starts every robot cube on the left", () => {
    const { robot } = sampleHands(image, options);
    expect(robot.count).toBe(12);
    for (let i = 0; i < robot.count; i++) expect(robot.source[i * 3]).toBeLessThan(0);
  });
  it("starts every human cube on the right", () => {
    const { human } = sampleHands(image, options);
    expect(human.count).toBe(12);
    for (let i = 0; i < human.count; i++) expect(human.source[i * 3]).toBeGreaterThan(0);
  });
  it("samples identical hands for an identical seed", () => {
    const a = sampleHands(image, options);
    const b = sampleHands(image, options);
    expect(a.robot.target).toEqual(b.robot.target);
    expect(a.human.source).toEqual(b.human.source);
  });
});
