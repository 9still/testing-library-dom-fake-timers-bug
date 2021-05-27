import {
  runWithRealTimers,
  jestFakeTimersAreEnabled
} from "@testing-library/dom/dist/helpers";

describe("runWithRealTimers/jestFakeTimersAreEnabled should be non-intrusive", () => {
  test("runAllTimers works without jestFakeTimersAreEnabled", async () => {
    jest.useFakeTimers("modern");

    const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, 300);
    });

    jest.runAllTimers();

    await myPromise;
  });

  test("runAllTimers fails with jestFakeTimersAreEnabled", async () => {
    jest.useFakeTimers("modern");

    const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, 300);
    });

    jestFakeTimersAreEnabled();
    jest.runAllTimers();

    await myPromise;
  });

  test("runAllTimers fails with runWithRealTimers", async () => {
    jest.useFakeTimers("modern");

    const myPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve("done");
      }, 300);
    });

    runWithRealTimers(() => {});

    jest.runAllTimers();

    await myPromise;
  });
});

