// A small set of Lucide icons (https://lucide.dev, ISC licence), imported as raw SVG text.
// Add an icon here, then use it with <Icon name="..." /> or in server-rendered HTML.
import sun from 'lucide-static/icons/sun.svg?raw';
import moon from 'lucide-static/icons/moon.svg?raw';
import play from 'lucide-static/icons/play.svg?raw';
import copy from 'lucide-static/icons/copy.svg?raw';
import check from 'lucide-static/icons/check.svg?raw';
import download from 'lucide-static/icons/download.svg?raw';
import rotateCcw from 'lucide-static/icons/rotate-ccw.svg?raw';
import arrowLeft from 'lucide-static/icons/arrow-left.svg?raw';
import arrowRight from 'lucide-static/icons/arrow-right.svg?raw';
import arrowUp from 'lucide-static/icons/arrow-up.svg?raw';
import arrowDown from 'lucide-static/icons/arrow-down.svg?raw';
import flask from 'lucide-static/icons/flask-conical.svg?raw';
import bookOpen from 'lucide-static/icons/book-open.svg?raw';
import hammer from 'lucide-static/icons/hammer.svg?raw';
import lock from 'lucide-static/icons/lock.svg?raw';
import circleCheck from 'lucide-static/icons/circle-check.svg?raw';
import star from 'lucide-static/icons/star.svg?raw';
import lightbulb from 'lucide-static/icons/lightbulb.svg?raw';
import triangleAlert from 'lucide-static/icons/triangle-alert.svg?raw';
import brain from 'lucide-static/icons/brain.svg?raw';
import link from 'lucide-static/icons/link.svg?raw';
import fileText from 'lucide-static/icons/file-text.svg?raw';
import paperclip from 'lucide-static/icons/paperclip.svg?raw';
import upload from 'lucide-static/icons/upload.svg?raw';
import pencil from 'lucide-static/icons/pencil.svg?raw';
import sunrise from 'lucide-static/icons/sunrise.svg?raw';
import partyPopper from 'lucide-static/icons/party-popper.svg?raw';
import coffee from 'lucide-static/icons/coffee.svg?raw';
import cloudOff from 'lucide-static/icons/cloud-off.svg?raw';
import bot from 'lucide-static/icons/bot.svg?raw';
import code from 'lucide-static/icons/code-xml.svg?raw';
import clock from 'lucide-static/icons/clock.svg?raw';
import circle from 'lucide-static/icons/circle.svg?raw';
import clipboardList from 'lucide-static/icons/clipboard-list.svg?raw';
import graduationCap from 'lucide-static/icons/graduation-cap.svg?raw';
import users from 'lucide-static/icons/users.svg?raw';
import listChecks from 'lucide-static/icons/list-checks.svg?raw';

// Remove the licence comment so the markup is just the <svg>.
const clean = (svg) => svg.replace(/<!--[\s\S]*?-->/g, '').trim();

export const icons = Object.fromEntries(
	Object.entries({
		sun,
		moon,
		play,
		copy,
		check,
		download,
		'rotate-ccw': rotateCcw,
		'arrow-left': arrowLeft,
		'arrow-right': arrowRight,
		'arrow-up': arrowUp,
		'arrow-down': arrowDown,
		flask,
		'book-open': bookOpen,
		hammer,
		lock,
		'circle-check': circleCheck,
		star,
		lightbulb,
		'triangle-alert': triangleAlert,
		brain,
		link,
		'file-text': fileText,
		paperclip,
		upload,
		pencil,
		sunrise,
		'party-popper': partyPopper,
		coffee,
		'cloud-off': cloudOff,
		bot,
		code,
		clock,
		circle,
		'clipboard-list': clipboardList,
		'graduation-cap': graduationCap,
		users,
		'list-checks': listChecks
	}).map(([k, v]) => [k, clean(v)])
);
