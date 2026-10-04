<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();
</script>

<svelte:head><title>Settings</title></svelte:head>

<div class="container narrow page">
	<h1>Settings</h1>
	{#if form?.saved}<p class="alert alert-ok">Settings saved.</p>{/if}
	<form method="POST" use:enhance={() => ({ update }) => update({ reset: false })}>
		<section class="card">
			<h2>Course</h2>
			<div class="field">
				<label for="course_name">Course name</label>
				<input id="course_name" name="course_name" type="text" value={data.settings.course_name} />
			</div>
			<div class="field">
				<label for="tagline">Tagline (shown on the home page)</label>
				<input id="tagline" name="tagline" type="text" value={data.settings.tagline} />
			</div>
			<div class="field">
				<label for="welcome_message">Welcome message (shown on every student’s dashboard)</label>
				<textarea id="welcome_message" name="welcome_message" rows="4">{data.settings.welcome_message}</textarea>
			</div>
		</section>

		<section class="card" style="margin-top: 20px">
			<h2>Who can join</h2>
			<div class="field">
				<label for="invite_code">Invite code</label>
				<input id="invite_code" name="invite_code" type="text" value={data.settings.invite_code} placeholder="e.g. BOLTON-2026" />
				<p class="hint">If set, people need this code to create an account. Leave empty to let anyone with the link sign up.</p>
			</div>
			<label class="check">
				<input type="checkbox" name="require_approval" checked={data.settings.require_approval === '1'} />
				New students must be approved by an instructor before they can see lessons
			</label>
		</section>

		<button class="btn btn-sun" style="margin-top: 20px">Save settings</button>
	</form>
</div>
