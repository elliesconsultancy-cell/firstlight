<script>
	import { enhance } from '$app/forms';
	let { data, form } = $props();
</script>

<svelte:head><title>Account</title></svelte:head>

<div class="container narrow page">
	<span class="eyebrow">Your account</span>
	<h1>Account settings</h1>

	<form class="card" method="POST" action="?/profile" use:enhance={() => ({ update }) => update({ reset: false })}>
		<h2>Profile</h2>
		{#if form?.profileSaved}<p class="alert alert-ok">Saved.</p>{/if}
		{#if form?.profileError}<p class="alert alert-error">{form.profileError}</p>{/if}
		<div class="field">
			<label for="name">Name</label>
			<input id="name" name="name" type="text" value={data.user.name} required />
		</div>
		<div class="field">
			<label for="email">Email</label>
			<input id="email" type="email" value={data.user.email} disabled />
		</div>
		<div class="field">
			<label for="bio">About you</label>
			<textarea id="bio" name="bio" placeholder="Your goals, what you want to build, anything you'd like your instructor to know.">{data.user.bio}</textarea>
		</div>
		<button class="btn" type="submit">Save profile</button>
	</form>

	<form class="card" style="margin-top: 20px" method="POST" action="?/password" use:enhance>
		<h2>Change password</h2>
		{#if form?.passwordSaved}<p class="alert alert-ok">Password updated.</p>{/if}
		{#if form?.passwordError}<p class="alert alert-error">{form.passwordError}</p>{/if}
		<div class="field">
			<label for="current">Current password</label>
			<input id="current" name="current" type="password" autocomplete="current-password" required />
		</div>
		<div class="field">
			<label for="next">New password</label>
			<input id="next" name="next" type="password" autocomplete="new-password" minlength="8" required />
		</div>
		<button class="btn" type="submit">Update password</button>
	</form>
</div>
