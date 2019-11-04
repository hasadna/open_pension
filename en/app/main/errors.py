from app.main.views import main


@main.app_errorhandler(403)
def forbidden(_):
    return "forbidden", 403


@main.app_errorhandler(404)
def page_not_found(_):
    return "page not found", 404


@main.app_errorhandler(500)
def internal_server_error(_):
    return "server error", 500
