package log

import (
	"github.com/coralogix/go-coralogix-sdk"
	"os"
)

var logger *coralogix.CoralogixLogger
var started bool

func getApplicationName() string {
	hostname, _ := os.Hostname()
	CoralogixApplicationName := os.Getenv("CORALOGIX_APPLICATION_NAME")

	if CoralogixApplicationName != "" {
		return CoralogixApplicationName
	}

	return hostname
}

func getLogger() *coralogix.CoralogixLogger {

	if started == false {
		logger = coralogix.NewCoralogixLogger(
			os.Getenv("CORALOGIX_PRIVATE_KEY"),
			getApplicationName(),
			"storage",
		)

		started = true
	}

	return logger
}

func Info(text string) {
	getLogger().Info(map[string]string{"text":  text})
}

func Debug(text string) {
	getLogger().Debug(map[string]string{"text":  text})

}

func Warning(text string) {
	getLogger().Warning(map[string]string{"text":  text})
}

func Error(err error) {
	getLogger().Error(map[string]string{"text":  err.Error()})
}
