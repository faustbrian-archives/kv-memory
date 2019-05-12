import { complianceTestsSync } from "@keeveestore/test-suite";
import { StoreSync } from "../src/sync";

complianceTestsSync(new StoreSync<string, number>(), {
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
});
