import { render, screen } from "@testing-library/react";

import { HelloWorld } from "@/app/(routes)/(dashboard)/page";

describe("Page", () => {
  it("renders a heading", async () => {
    render(await HelloWorld());

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Hello World",
    });

    expect(heading).toBeInTheDocument();
  });
});
