import { MApp } from "@/components/app/app";

(window as any)['MApp'] = MApp;

document?.addEventListener(
	'DOMContentLoaded',
	() => MApp.autobind(),
	{ once: true },
)


