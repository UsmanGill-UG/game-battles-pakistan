from django.conf import settings


def bootstrap_settings(request):
    return {
        'BOOTSTRAP_CSS_PATH': settings.BOOTSTRAP_CSS_PATH,
        'BOOTSTRAP_INTEGRITY': settings.BOOTSTRAP_INTEGRITY,
        'BOOTSTRAP_JS_PATH': settings.BOOTSTRAP_JS_PATH,
        'BOOTSTRAP_JS_INTEGRITY': settings.BOOTSTRAP_JS_INTEGRITY,
        'JQUERY_PATH': settings.JQUERY_PATH,
        'POPPER_JS_PATH': settings.POPPER_JS_PATH,
    }
