const TIMEOUT = 10000;

describe("double-break-overflow", () => {
	let page;
	beforeAll(async () => {
		page = await loadPage("breaks/double-break-overflow/double-break-overflow.html");
		return page.rendered;
	}, TIMEOUT);

	afterAll(async () => {
		if (!DEBUG) {
			await page.close();
		}
	});

	it("should not skip content after an overflow boundary and break-before", async () => {
		let pages = await page.$$eval(".pagedjs_page", (r) => {
			return r.length;
		});

		expect(pages).toEqual(2);

		let targetMissing = await page.$$eval(".pagedjs_page", (r) => {
			return !r.some((p) => p.textContent.includes("TARGET"));
		});

		expect(targetMissing).toEqual(false);
	});
});
