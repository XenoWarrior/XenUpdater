<template>
	<div id="wrapper">
		<nav>
			<div id="draggable" class="nav-wrapper">
				<ul class="left">
					<li><a href="#">WEBSITE</a></li>
					<li><a href="#">REGISTER</a></li>
					<li><a href="#">FORUMS</a></li>

					<li><a class="logo-red">&nbsp;</a></li>
				</ul>
				<ul class="right">
					<li class="settings">
						<a href="#">&nbsp;</a>
					</li>
					<li class="minimise">
						<a href="#">&nbsp;</a>
					</li>
					<li class="close">
						<a href="#">&nbsp;</a>
					</li>
				</ul>
			</div>
		</nav>
		<div class="background"></div>
		<main>
			<div id="connection" class="container center valign-wrapper">
				<div class="row content-container">
					<h3>Connecting...</h3>
					<div class="col s12">
						<div class="preloader-wrapper big active">
							<div class="spinner-layer spinner-blue-only">
								<div class="circle-clipper left">
									<div class="circle"></div>
								</div>
								<div class="gap-patch">
									<div class="circle"></div>
								</div>
								<div class="circle-clipper right">
									<div class="circle"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="col s12">
						<div class="message col s12">
							Getting ready for the world of Aincrad...
						</div>
					</div>
				</div>
			</div>
			<div id="main" class="container">
				<div class="container layer">
					<div class="row margin">
					</div>
					<div class="row valign-wrapper logo-container">
						<div class="col s12">
							<img class="logo right" src="~@/assets/images/logos/blue/logo_blue_coloredtext_1_small.png">
						</div>
					</div>
				</div>
				<div id="content-container" class="row">
					<div id="notes" class="col s8">
						<div class="content-header">PATCH NOTES</div>
						<div class="scrollable">
							<div class="row">
								<div class="col s1 version">
									v2.1
								</div>
								<div class="col s11 notes">
									<ul>
										<li>Developed with ❤ by XenoWarrior.</li>
										<li>Love the design by Deka.</li>
										<li>Special thanks to Senpai Zenpai for his cutting skills.</li>
										<li><a href="#">Read more...</a></li>
									</ul>
								</div>
							</div>
							<div class="row">
								<div class="col s1 version">
									v2.0
								</div>
								<div class="col s11 notes">
									<ul>
										<li>Added cheat mode, use ALT+F4 the launcher to turn it on.</li>
										<li><a href="#">Read more...</a></li>
									</ul>
								</div>
							</div>
							<div class="row">
								<div class="col s1 version">
									v1.1
								</div>
								<div class="col s11 notes">
									<ul>
										<li>Made Blacky even hotter, just wait until you see his abs.</li>
										<li>Fixed an issue where Blacky would only wake 10 mins before meetings.</li>
										<li><a href="#">Read more...</a></li>
									</ul>
								</div>
							</div>
							<div class="row">
								<div class="col s1 version">
									v1.0
								</div>
								<div class="col s11">
									<ul>
										<li>Added new music for dungeons.</li>
										<li>Added new monsters.</li>
										<li>Added a new boss zone on floor 1.</li>
										<li>Fixed issue with textures on buildings.</li>
										<li>Fixed bug where the controller would randomly get stuck.</li>
										<li>Removed the logout button.</li>
										<li><a href="#">Read more...</a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div id="news" class="col s4">
						<div class="content-header">NEWS</div>
						<div class="scrollable">
							<div class="row news">
								<div class="col s2 version">
									07/17
								</div>
								<div class="col s10">
									<ul>
										<li>Age of Aincrad Alpha Release!</li>
									</ul>
								</div>
							</div>
							<div class="row news">
								<div class="col s2 version">
									07/17
								</div>
								<div class="col s10">
									<ul>
										<li>Beta ETA Confirmed.</li>
									</ul>
								</div>
							</div>
							<div class="row news">
								<div class="col s2 version">
									07/17
								</div>
								<div class="col s10">
									<ul>
										<li>1st Battle Tournament Details.</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col s4 left">
					</div>
					<div id="status" class="col s4">
						<div class="server-status">
							<div class="title">Server Status:</div>
							<div class="status">Online</div>
						</div>
					</div>
					<div class="col s4">
					</div>
				</div>
				<div class="row">
					<div class="col s4">
					</div>
					<div class="col s4">
						<div class="col s12">
							<div class="play disabled"></div>
						</div>
					</div>
					<div class="col s4">
					</div>
				</div>
				<div class="row">
					<div class="col s12">
						<div class="progress">
							<div class="progress-back">
								<div class="progress-limiter"></div>
							</div>
						</div>
					</div>
					<div class="col s12 center">
						<span class="percent"><span id="percent">X%</span></span>
					</div>
				</div>
			</div>
			<div id="settings" class="container">
				<div class="row content-container">
					<div class="col s12">
						<a id="settings-back" class="waves-effect waves-light btn">Back</a>
					</div>
				</div>
			</div>
			<div id="error" class="container">
				<div class="row content-container">
					<h2>An error has occured...</h2>
					<div class="message col s12">
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import PackageManagerMixin from './LandingPage/PackageManagerMixin.js'
	import LauncherMixin from './LandingPage/LauncherMixin.js'
	export default {
		name: 'landing-page',
		mixins: [
			PackageManagerMixin,
			LauncherMixin
		],
		data(){
			return {
				result: null
			}
		},
		mounted(){
			this.initialiseLauncher()
		},
		methods: {
			async initialiseLauncher() {
				// Initialise launcher
				this.bindEventListeners();

				// Initialise packages from servertry {
				try{
					let result = await this.initialiseService();
					result ? this.switchWindow("main") : this.handleError("Unable to connect to server.");

					this.doProgressTest();
				} catch (exception) {
					console.error(exception);
					this.handleError(exception.message);
				}
			}

		}
	}
</script>

<style lang="scss">
	/** Main **/
	.container {
		margin-top: 70px;
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: url('~@/assets/images/backgrounds/background_3.png');
		background-repeat: no-repeat;
		background-size: cover;
		height: 100%;
		width: 100%;
		z-index: -999;
		filter: grayscale(100%) sepia(100%) hue-rotate(90deg);
		overflow: hidden;
	}

	/** Windows **/

	#connection {
		display: block;
		transition: all .5s ease;

		background-color: rgba(0, 0, 0, 0.7);
		text-align: center;
		color: #FFFFFF;
		border-radius: 6px;
		padding: 10px;
	}

	#main {
		display: none;
		transition: all .5s ease;
	}

	#settings {
		display: none;
		transition: all .5s ease;
	}

	#error {
		display: none;
		transition: all .5s ease;

		background-color: rgba(0, 0, 0, 0.7);
		text-align: center;
		color: #FFFFFF;
		border-radius: 6px;
		padding: 10px;
	}

	/** Navigation **/

	nav .nav-wrapper {
		background: #161b23;
		border: none;
		border-bottom: 2px solid #128fb8;

		li {
			font-family: sans-serif, Arial, Helvetica;
			font-size: 14px;
			transition: all .5s ease;

			&:hover {
				text-shadow: 0px 0px 10px #128fb8;
				transition: all .5s ease;
			}
		}

		/** Buttons **/

		& .close {
			background-image: url('~@/assets/images/close_normal.png');
		}

		& .close:hover {
			background-image: url('~@/assets/images/close_hover.png');
		}

		& .minimise {
			background-image: url('~@/assets/images/minimise_normal.png');
		}

		& .minimise:hover {
			background-image: url('~@/assets/images/minimise_hover.png');
		}

		& .settings {
			background-image: url('~@/assets/images/settings_normal.png');
		}

		& .settings:hover {
			background-image: url('~@/assets/images/settings_hover.png');
		}

		& .minimise, & .close, & .settings, & .minimise:hover, & .close:hover, & .settings:hover {
			background-repeat: no-repeat;
			background-position: center;
			width: 40px;
			-webkit-app-region: none;
			transition: all .5s ease;
		}
	}

	/** Draggable **/

	#draggable {
		-webkit-app-region: drag;
	}

	#draggable li {
		-webkit-app-region: none;
	}

	/** Components **/

	#notes {
		border: 1px solid rgba(255, 255, 255, .3);
		background-color: rgba(0, 0, 0, 0.5);
		background-repeat: no-repeat;
	}

	#news {
		overflow: hidden;
	}

	#news, #notes {
		text-align: left;
		font-size: 12px;
		color: #FFFFFF;
		overflow-y: auto;
	}

	.percent {
		font-size: 14px;
		color: #FFFFFF;
		line-height: 12px;
	}

	.message {
		padding: 10px;
	}

	.scrollable {
		height: 231px;
		padding: 10px;
		scroll-margin: 50px 0 0 50px;
		overflow-y: auto;
		overflow-x: hidden;
	}

	.version {
		color: grey;
	}

	.news {
		margin-bottom: 3px;
	}

	/** Content **/

	#content-container {
		margin-top: 70px;
		margin-bottom: 0px;
	}

	.content-header {
		padding: 10px;
		border-bottom: 1px solid rgba(255, 255, 255, .2);
	}

	.content-text {
		padding: 10px;
		width: 100%;
		height: 90%;
	}

	/** Play Button **/

	.play {
		background-image: url('~@/assets/images/start_normal.png');
		background-repeat: no-repeat;
		background-position: center;
		height: 56px;
		transition: all .5s ease;
		text-align: center;
		cursor: pointer;
	}

	.play:hover {
		background-image: url('~@/assets/images/start_hover.png');
		background-repeat: no-repeat;
		transition: all .5s ease;
	}

	.play.disabled {
		background-image: url('~@/assets/images/start_updating.png');
		background-repeat: no-repeat;
		transition: all .5s ease;
	}

	/** Progress Bar **/

	.progress {
		background-color: rgba(0, 148, 255, .2);
		border: 1px solid rgba(255, 255, 255, .2);
		width: 100%;
		height: 14px;
		display: block;
		margin-left: auto;
		margin-right: auto;
		transition: all .2s ease;
		box-shadow: 0px 0px 50px rgba(255, 0, 0, 0.5);
	}

	.progress-back {
		display: block;
		background-color: rgba(32, 143, 233, 1);
		width: 0%;
		height: 14px;
		display: block;
		margin-left: auto;
		margin-right: auto;
		float: left;
		transition: all .2s ease;
	}

	.progress-limiter {
		background-image: url('~@/assets/images/progress-limiter.png');
		width: 3px;
		height: 14px;
		float: right;
	}

	/** Scrollbar **/

	::-webkit-scrollbar {
		width: 6px;
	}

	::-webkit-scrollbar-track {
		background: none;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 6px;
		background: #787b80;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}

	/** Status **/

	#status {
		padding: 0px;
	}

	.server-status {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.875rem;
		padding: 0 0.75rem 0 2.5rem;
		width: 250px;
		float: right;
	}

	.server-status::after {
		content: ' ';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		border-top: 1.875rem solid rgba(0, 0, 0, 0.5);;
		border-left: 1.875rem solid transparent;
		z-index: -1;
	}

	.server-status .title {
		font-size: 0.675rem;
		font-weight: normal;
		text-transform: uppercase;
		color: gray;
	}

	.server-status .status {
		font-size: 0.675rem;
		font-weight: bolder;
		text-transform: uppercase;
		color: white;
	}

	/** Logo **/

	.layer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -999;

	}

	.margin {
		margin-top: 150px;
	}

	.logo {
		height: 25%;
		width: 25%;
	}

	.logo-container {
		height: 192px;
	}

	.logo-blue-blue-1 {
		background-image: url('~@/assets/images/logos/blue/logo_blue_coloredtext_1.png');
	}

	.logo-blue-blue-2 {
		background-image: url('~@/assets/images/logos/blue/logo_blue_coloredtext_2.png');
	}

	.logo-blue-white-1 {
		background-image: url('~@/assets/images/logos/blue/logo_blue_whitetext_1.png');
	}

	.logo-blue-white-2 {
		background-image: url('~@/assets/images/logos/blue/logo_blue_whitetext_2.png');
	}

	.logo-blue-blue-simple {
		background-image: url('~@/assets/images/logos/blue/logo_blue_simple.png');
	}
</style>
